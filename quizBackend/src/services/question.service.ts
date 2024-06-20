import { IQuestion } from '../interfaces/IQuestion';
import { injectable } from 'inversify';
import { QuestionModel } from '../models/question.model';

export interface IQuestionService {
    createQuestion(questionData: IQuestion): Promise<IQuestion>;
    findQuestionById(id: string): Promise<IQuestion | null>;
    findAllQuestions(): Promise<IQuestion[]>;
    updateQuestion(id: string, questionData: IQuestion): Promise<IQuestion | null>;
    deleteQuestion(id: string): Promise<boolean>;
}

@injectable()
export class QuestionService implements IQuestionService {
    async createQuestion(questionData: IQuestion): Promise<IQuestion> {
        return await QuestionModel.create(questionData);
    }

    async findQuestionById(id: string): Promise<IQuestion | null> {
        return await QuestionModel.findById(id).exec();
    }

    async findAllQuestions(): Promise<IQuestion[]> {
        return await QuestionModel.find().exec();
    }

    async updateQuestion(id: string, questionData: IQuestion): Promise<IQuestion | null> {
        return await QuestionModel.findByIdAndUpdate(id, questionData, { new: true }).exec();
    }

    async deleteQuestion(id: string): Promise<boolean> {
        const result = await QuestionModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}