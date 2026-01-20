// context/CompletedChaptersContext.ts
import { createContext, Dispatch, SetStateAction } from "react";

type CompletedChaptersContextType = {
  completedChapters: number[];
  setCompletedChapters: Dispatch<SetStateAction<number[]>>;
};

const CompletedChaptersContext =
  createContext<CompletedChaptersContextType | null>(null);

export default CompletedChaptersContext;
