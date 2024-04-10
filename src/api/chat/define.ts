export interface ChatParams {
  messages: {
    role: string;
    content: string;
  }[];
  system: string;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  result: string;
}
