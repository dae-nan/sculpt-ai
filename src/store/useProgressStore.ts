
import { create } from "zustand";

export type ProgressEntry = {
  date: string; // YYYY-MM-DD
  weight: number;
  bodyFat: number;
  sleepHours: number;
  didWorkout: boolean;
  photoUrl?: string; // Local preview
};

interface ProgressState {
  entries: ProgressEntry[];
  addEntry: (entry: Omit<ProgressEntry, "photoUrl"> & { photoUrl?: string }) => void;
}

const MOCK_PROGRESS: ProgressEntry[] = [
  { date: "2025-04-15", weight: 180, bodyFat: 22, sleepHours: 7, didWorkout: true },
  { date: "2025-04-16", weight: 179.5, bodyFat: 21.8, sleepHours: 6.5, didWorkout: false },
  { date: "2025-04-17", weight: 179, bodyFat: 21.6, sleepHours: 7.2, didWorkout: true },
  { date: "2025-04-18", weight: 178.7, bodyFat: 21.4, sleepHours: 7.5, didWorkout: true },
  { date: "2025-04-19", weight: 178.4, bodyFat: 21.2, sleepHours: 8, didWorkout: true },
];

const useProgressStore = create<ProgressState>((set) => ({
  entries: MOCK_PROGRESS,
  addEntry: (entry) => set((state) => ({
    entries: [...state.entries, entry]
  })),
}));

export default useProgressStore;
