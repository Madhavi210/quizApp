import { IQuiz } from '../interfaces/IQuiz';
import { injectable } from 'inversify';
import { QuizModel } from '../models/quiz.model';
import { QuestionModel } from '../models/question.model';
import { log } from 'console';

export interface IQuizService {
    createQuiz(title: string): Promise<string>;
    findQuizById(id: string): Promise<IQuiz | null>;
    findAllQuizzes(): Promise<IQuiz[]>;
    updateQuiz(id: string, quizData: IQuiz): Promise<IQuiz | null>;
    deleteQuiz(id: string): Promise<boolean>;
}

@injectable()
export class QuizService implements IQuizService {
    async createQuiz(title: string): Promise<string> {
        const questions= await QuestionModel.aggregate([
            {$sample: {size:5}},
            {
                $project: {
                    _id: 1,
                    questionText: 1,
                    options: 1,
                    correctAnswerIndex: 1
                }
            }
        ]);
        console.log(questions);
        

        const quizData: IQuiz = {
            title: title,
            description: 'Quiz generated dynamically',
            questions: questions.map(q => ({
                _id: q._id,
                questionText: q.questionText,
                options: q.options,
                correctAnswerIndex: q.correctAnswerIndex
            }))
        };

        // console.log(quizData);
        
        const newQuiz = await QuizModel.create(quizData);
        // const populatedQuiz = await QuizModel.findById(newQuiz._id).populate('questions').exec();
        // console.log(populatedQuiz);
        
        const populatedQuiz = await QuizModel.findById(newQuiz._id).exec();
        if (populatedQuiz) {
            populatedQuiz.questions = await QuestionModel.find({ _id: { $in: populatedQuiz.questions } }).exec();
            await populatedQuiz.save();
        }

        return populatedQuiz ? populatedQuiz._id : '';
        // return newQuiz._id;
    }

    async findQuizById(id: string): Promise<IQuiz | null> {
        const quiz = await QuizModel.findById(id).populate('questions').exec();
        return quiz;
        // return await QuizModel.findById(id).exec();
    }

    async findAllQuizzes(): Promise<IQuiz[]> {
        const quizzes = await QuizModel.find().populate('questions').exec();
        return quizzes;
        // return await QuizModel.find().exec();
    }

    async updateQuiz(id: string, quizData: IQuiz): Promise<IQuiz | null> {
        // return await QuizModel.findByIdAndUpdate(id, quizData, { new: true }).exec();
        const updatedQuiz = await QuizModel.findByIdAndUpdate(id, quizData, { new: true }).exec();
        return updatedQuiz;
    }

    async deleteQuiz(id: string): Promise<boolean> {
        const result = await QuizModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}