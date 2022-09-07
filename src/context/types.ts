export interface Player {
  id: number;
  points: number;
  moves: number;
}

export interface MemoryItem {
  id: number;
  content: number|JSX.Element;
  opened: boolean;
  discovered: boolean;
}

export type MemoryContent = number|JSX.Element;