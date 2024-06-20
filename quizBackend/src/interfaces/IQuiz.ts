// src/interfaces/IQuiz.ts
import { IQuestion } from './IQuestion';

export interface IQuiz {
    _id?: string;
    title: string;
    description: string;
    questions: IQuestion[];
}