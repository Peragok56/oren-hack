
export interface AnswerData {
    text: string;
    isCorrect: boolean;
  }
  
export interface QuestionData {
    question: string;
    answers: AnswerData[];
  }
  
export interface QuestionProps {
    onSave?: (data: QuestionData) => void;
  }