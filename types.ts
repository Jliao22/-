export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  BODY_MAP = 'BODY_MAP',
  SIMULATION = 'SIMULATION',
  RESEARCH = 'RESEARCH'
}

export interface BodyPartInfo {
  id: string;
  name: string;
  inflammationType: 'Acute' | 'Chronic';
  symptoms: string[];
  cognitiveImpact: string;
  decisionError: string;
  prevention: string;
}

export interface SimulationScenario {
  id: number;
  title: string;
  context: string;
  healthyResponse: {
    action: string;
    reasoning: string;
    outcome: string;
  };
  inflamedResponse: {
    action: string;
    reasoning: string;
    outcome: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: {
    title: string;
    uri: string;
  }[];
  isThinking?: boolean;
}