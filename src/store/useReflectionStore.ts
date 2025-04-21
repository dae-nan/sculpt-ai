
import { create } from "zustand";

export interface ReflectionInputs {
  feeling: number;        // 1-5
  hardest: number;        // 1-5
  notes: string;
  date: string;
}

interface ReflectionState {
  reflection: ReflectionInputs | null;
  setReflection: (reflection: ReflectionInputs) => void;
  resetReflection: () => void;
}

const useReflectionStore = create<ReflectionState>((set) => ({
  reflection: null,
  setReflection: (reflection) => set({ reflection }),
  resetReflection: () => set({ reflection: null }),
}));

export default useReflectionStore;
