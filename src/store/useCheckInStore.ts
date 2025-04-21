
import { create } from "zustand";

export interface CheckInInputs {
  sleepQuality: number;   // 1-5
  soreness: number;       // 1-5
  mood: number;           // 1-5
  date: string;           // YYYY-MM-DD
}

interface CheckInState {
  checkIn: CheckInInputs | null;
  setCheckIn: (input: CheckInInputs) => void;
  resetCheckIn: () => void;
}

const today = new Date().toISOString().slice(0, 10);

const useCheckInStore = create<CheckInState>((set) => ({
  checkIn: null,
  setCheckIn: (input) => set({ checkIn: input }),
  resetCheckIn: () => set({ checkIn: null }),
}));

export default useCheckInStore;
