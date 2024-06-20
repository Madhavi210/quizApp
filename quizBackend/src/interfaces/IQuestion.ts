// src/interfaces/IQuestion.ts
export interface IQuestion {
    _id?: string;
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
}
