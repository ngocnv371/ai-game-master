export type Scenario = {
  id: string;
  title: string;
  genre: string;
  description: string;
  imageUrl: string;
  initialMessage?: {
    narrative: string;
    suggestedActions: string[];
  };
};

export type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
  suggestedActions?: string[];
  imageUrl?: string;
  isGeneratingImage?: boolean;
};

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
