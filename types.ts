export type View = 'lectures' | 'quiz' | 'chatbot';

export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChapterQuiz {
  [key: string]: Question[];
}

export interface LectureFile {
    title: string;
    filePath: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}