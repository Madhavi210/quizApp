import { IQuiz } from '../interfaces/IQuiz';
import { injectable } from 'inversify';
import { QuizModel } from '../models/quiz.model';

export interface IQuizService {
    createQuiz(quizData: IQuiz): Promise<IQuiz>;
    findQuizById(id: string): Promise<IQuiz | null>;
    findAllQuizzes(): Promise<IQuiz[]>;
    updateQuiz(id: string, quizData: IQuiz): Promise<IQuiz | null>;
    deleteQuiz(id: string): Promise<boolean>;
}

@injectable()
export class QuizService implements IQuizService {
    async createQuiz(quizData: IQuiz): Promise<IQuiz> {
        return await QuizModel.create(quizData);
    }

    async findQuizById(id: string): Promise<IQuiz | null> {
        return await QuizModel.findById(id).exec();
    }

    async findAllQuizzes(): Promise<IQuiz[]> {
        return await QuizModel.find().exec();
    }

    async updateQuiz(id: string, quizData: IQuiz): Promise<IQuiz | null> {
        return await QuizModel.findByIdAndUpdate(id, quizData, { new: true }).exec();
    }

    async deleteQuiz(id: string): Promise<boolean> {
        const result = await QuizModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}