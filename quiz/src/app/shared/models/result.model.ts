import { IUser } from "./user.model";
import { IQuiz } from "./quiz.model";
import { IQuestion } from "./question.model";

export interface IResult {
    _id?: string;
    quiz: IQuiz['_id'];
    user: IUser['_id'];
    score: number;
    totalQuestions: number;
    grade: string;
    attemptedAt: Date;
}