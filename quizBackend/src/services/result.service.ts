import { IResult } from '../interfaces/IResult';
import { injectable } from 'inversify';
import { ResultModel } from '../models/result.model';

export interface IResultService {
    createResult(resultData: IResult): Promise<IResult>;
    findResultById(quizId: string, userId: string): Promise<IResult | null>;
    findAllResults(): Promise<IResult[]>;
    updateResult(id: string, resultData: IResult): Promise<IResult | null>;
    deleteResult(id: string): Promise<boolean>;
}

@injectable()
export class ResultService implements IResultService {
    async createResult(resultData: IResult): Promise<IResult> {
        return await ResultModel.create(resultData);
    }

    async findResultById(quizId: string, userId: string): Promise<IResult | null> {
        return await ResultModel.findOne({ quiz: quizId, user: userId }).exec();
    }

    async findAllResults(): Promise<IResult[]> {
        return await ResultModel.find().exec();
    }

    async updateResult(id: string, resultData: IResult): Promise<IResult | null> {
        return await ResultModel.findByIdAndUpdate(id, resultData, { new: true }).exec();
    }

    async deleteResult(id: string): Promise<boolean> {
        const result = await ResultModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
