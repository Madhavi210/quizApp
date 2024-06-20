// src/models/quiz.model.ts
import { Schema, model, Document } from 'mongoose';
import { IQuiz } from '../interfaces/IQuiz';

const QuizSchema = new Schema<IQuiz>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'QuestionModel' }],
});

export const QuizModel = model<IQuiz>('QuizModel', QuizSchema);
