// src/models/result.model.ts
import { Schema, model, Document } from 'mongoose';
import { IResult } from '../interfaces/IResult';
import { IUserDocument } from './user.model';

const ResultSchema = new Schema<IResult>({
    quiz: { type: Schema.Types.ObjectId, ref: 'QuizModel', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'UserModel', required: false },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    grade: {type:String, required: true},
    attemptedAt: { type: Date, default: Date.now }
});

export const ResultModel = model<IResult>('ResultModel', ResultSchema);
