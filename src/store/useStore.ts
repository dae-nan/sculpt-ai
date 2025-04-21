import { create } from 'zustand';

// Types
export interface Goal {
  targetWeight?: number;
  currentWeight?: number;
  targetBodyFat?: number;
  currentBodyFat?: number;
  fitnessObjectives: string[];
  sportSpecific?: string;
  trainingFrequency: number; // days per week
}

export interface Coach {
  id: string;
  name: string;
  photoUrl: string;
  specialties: string[];
  achievements: string[];
  philosophy: string;
  recommended?: boolean;
}

export interface DailyPlanSection {
  type: "workout" | "meals" | "recovery";
  title: string;
  items: string[];
  highlight?: boolean;
  reason?: string; // for tooltip ("Why this?")
}

export interface DailyPlan {
  date: string;
  sections: DailyPlanSection[];
  coachName?: string;
  recoveryState: "low" | "normal" | "high";
}

interface AppState {
  // Goal setup state
  goals: Goal;
  setGoals: (goals: Goal) => void;
  updateGoal: <K extends keyof Goal>(key: K, value: Goal[K]) => void;
  
  // Coach matching state
  selectedCoach: Coach | null;
  setSelectedCoach: (coach: Coach) => void;
  
  // UI state
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isGoalSetupComplete: boolean;
  completeGoalSetup: () => void;
  
  // Daily plan preview state
  dailyPlan: DailyPlan | null;
  setDailyPlan: (plan: DailyPlan) => void;
  generateMockDailyPlan: (coach: Coach | null, assessment: any) => void;
  
  // Training split state
  trainingSplit: keyof typeof trainingSplitTemplates;
  setTrainingSplit: (split: keyof typeof trainingSplitTemplates) => void;
}

// Default goal values
const defaultGoals: Goal = {
  fitnessObjectives: [],
  trainingFrequency: 3
};

function getRecoveryState(assessment: any): "low" | "normal" | "high" {
  // Simple mock logic: low sleep/poor recovery -> "low"
  if (assessment?.sleepHours !== "" && assessment.sleepHours < 6) return "low";
  if (assessment?.sleepHours !== "" && assessment.sleepHours > 8) return "high";
  return "normal";
}

function createMockDailyPlan(
  coach: Coach | null,
  assessment: any,
  goals: Goal
): DailyPlan {
  const today = new Date().toISOString().slice(0, 10);
  const recoveryState = getRecoveryState(assessment);

  // Main section content logic
  let workout: string, meal1: string, meal2: string, recovery: string, workoutReason: string;
  if (recoveryState === "low") {
    // Light workout and extra recovery
    workout = "Active Recovery: 20 min brisk walk, light stretching";
    workoutReason = "Your recovery is low, so today focuses on light activity.";
    meal1 = "High-protein breakfast, extra hydration";
    meal2 = "Balanced lunch with healthy fats";
    recovery = "Focus on sleep and gentle mobility.";
  } else if (recoveryState === "high") {
    // Harder workout
    workout = "Intensity: Strength + HIIT - Lower body & core";
    workoutReason = "You are well-recovered, pushing intensity today!";
    meal1 = "Power breakfast and pre-workout snack";
    meal2 = "Protein-rich lunch, antioxidant-rich veggies";
    recovery = "Light walking, keep active!";
  } else {
    // Normal day
    workout = "Smart Strength: Upper body & cardio intervals";
    workoutReason = "Balanced day based on your status.";
    meal1 = "Eggs, oats & fruit or smoothie";
    meal2 = "Grilled chicken/salmon with quinoa, salad";
    recovery = "Foam rolling or yoga, 10-15 min.";
  }

  const plan: DailyPlan = {
    date: today,
    coachName: coach?.name,
    recoveryState,
    sections: [
      {
        type: "workout",
        title: "Today's Workout",
        items: [workout],
        highlight: recoveryState === "low" || recoveryState === "high",
        reason: workoutReason,
      },
      {
        type: "meals",
        title: "Meals",
        items: [meal1, meal2],
        reason: "Meal plan reflects your activity intensity.",
      },
      {
        type: "recovery",
        title: "Recovery Focus",
        items: [recovery],
        highlight: recoveryState === "low",
        reason:
          recoveryState === "low"
            ? "Extra rest suggested due to low recovery."
            : "Recovery matches today's plan.",
      },
    ],
  };
  return plan;
}

// Predefine schedule templates
export const trainingSplitTemplates = {
  "3-day": {
    name: "Push-Pull-Legs",
    days: {
      Mon: "Push",
      Tue: "-",
      Wed: "Pull",
      Thu: "-",
      Fri: "Legs",
      Sat: "-",
      Sun: "-"
    }
  },
  "4-day": {
    name: "Upper-Lower (A)",
    days: {
      Mon: "Upper",
      Tue: "Lower",
      Wed: "-",
      Thu: "Upper",
      Fri: "Lower",
      Sat: "-",
      Sun: "-"
    }
  },
  "5-day": {
    name: "Body-part Split",
    days: {
      Mon: "Chest",
      Tue: "Back",
      Wed: "Legs",
      Thu: "Shoulders",
      Fri: "Arms",
      Sat: "-",
      Sun: "-"
    }
  }
};

// Create store
const useStore = create<AppState>((set, get) => ({
  // Goal setup state
  goals: defaultGoals,
  setGoals: (goals) => set({ goals }),
  updateGoal: (key, value) => set((state) => ({
    goals: { ...state.goals, [key]: value }
  })),
  
  // Coach matching state
  selectedCoach: null,
  setSelectedCoach: (coach) => set({ selectedCoach: coach }),
  
  // UI state
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  isGoalSetupComplete: false,
  completeGoalSetup: () => set({ isGoalSetupComplete: true }),
  
  // Daily plan preview state
  dailyPlan: null,
  setDailyPlan: (plan) => set({ dailyPlan: plan }),
  generateMockDailyPlan: (coach, assessment) => {
    const goals = get().goals;
    const plan = createMockDailyPlan(coach, assessment, goals);
    set({ dailyPlan: plan });
  },
  
  // Training split state
  trainingSplit: "3-day",
  setTrainingSplit: (split) => set({ trainingSplit: split }),
}));

export default useStore;
