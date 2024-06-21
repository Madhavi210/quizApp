
import { IQuestion } from "./question.model";
export interface IQuiz {
    _id?: string;
    title: string;
    description: string;
    questions: IQuestion[];
}
  