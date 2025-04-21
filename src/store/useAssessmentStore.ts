
import { create } from "zustand";

export interface AssessmentInputs {
  weight: number | "";
  sleepHours: number | "";
  experience: string;
  dietaryRestrictions: string[];
  equipment: string[];
  bodyFatEstimate: number | "";
}

interface AssessmentState {
  assessment: AssessmentInputs;
  setAssessment: (assessment: Partial<AssessmentInputs>) => void;
  resetAssessment: () => void;
}

const defaultAssessment: AssessmentInputs = {
  weight: "",
  sleepHours: "",
  experience: "",
  dietaryRestrictions: [],
  equipment: [],
  bodyFatEstimate: "",
};

const useAssessmentStore = create<AssessmentState>((set) => ({
  assessment: defaultAssessment,
  setAssessment: (assessment) =>
    set((state) => ({
      assessment: { ...state.assessment, ...assessment },
    })),
  resetAssessment: () => set({ assessment: defaultAssessment }),
}));

export default useAssessmentStore;
