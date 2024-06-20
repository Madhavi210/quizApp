// src/interfaces/IResult.ts
import { IQuiz } from './IQuiz';
import { IUser } from './IUser';

export interface IResult {
    _id?: string;
    quiz: IQuiz['_id'];
    user: IUser['_id'];
    score: number;
    totalQuestions: number;
    grade: string;
    attemptedAt: Date;
}
