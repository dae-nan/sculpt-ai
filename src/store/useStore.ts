
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
}

// Default goal values
const defaultGoals: Goal = {
  fitnessObjectives: [],
  trainingFrequency: 3
};

// Create store
const useStore = create<AppState>((set) => ({
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
  completeGoalSetup: () => set({ isGoalSetupComplete: true })
}));

export default useStore;
