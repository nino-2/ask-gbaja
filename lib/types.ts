export type Source = {
  label: string;
  url?: string;
  date?: string;
};

export type Answer = {
  found: boolean;
  text?: string;
  sources?: Source[];
  /** Answer was written in a different language from the one chosen (reviewed text not yet available). */
  fallback?: boolean;
  /** Answer was written by the AI from approved records (never voiced by the cloned voice). */
  ai?: boolean;
  audio?: string;
  voiceBy?: string;
};
