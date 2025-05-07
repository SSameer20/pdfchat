export type LLMInput = {
  question: string;
  content: string;
  instructions?: string;
};

export type LLMResponse = {
  result: string;
};
