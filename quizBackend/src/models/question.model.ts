// src/models/question.model.ts
import { Schema, model, Document } from 'mongoose';
import { IQuestion } from '../interfaces/IQuestion';

const QuestionSchema = new Schema<IQuestion>({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true }
});

export const QuestionModel = model<IQuestion>('QuestionModel', QuestionSchema);
