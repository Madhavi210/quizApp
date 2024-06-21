import { Request, Response } from 'express';
import { controller, httpGet, httpDelete, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IQuizService } from '../services/quiz.service';
import { IQuiz } from '../interfaces/IQuiz';
import { TYPES } from '../config/types';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { title } from 'process';
const authMiddleware = new AuthMiddleware();

@controller('/quiz')
export class QuizController {
    constructor(
        @inject(TYPES.QuizService) private readonly quizService: IQuizService 
    ){}

    @httpGet('/', )
    async getAllQuizzes(req: Request,  res: Response): Promise<void> {
        try {
            const quizzes = await this.quizService.findAllQuizzes();
            res.status(200).json(quizzes); // Send the fetched quizzes in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpGet('/:id')
    async getQuizById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const quiz = await this.quizService.findQuizById(id);
            if (!quiz) {
                res.status(404).json({ error: 'Quiz not found' });
            } else {
                res.status(200).json(quiz); // Send the fetched quiz in the response
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpPost('/')
    async createQuiz(req: Request, res: Response): Promise<void> {
        try {
            // const quizData: IQuiz = req.body;
            const title: string = req.body.title; // Assuming title is passed in request body
            const newQuiz = await this.quizService.createQuiz(title);
            res.status(201).json(newQuiz); // Send the created quiz in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpDelete('/:id', authMiddleware.isLoggedIn)
    async deleteQuiz(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const deleted = await this.quizService.deleteQuiz(id);
            if (deleted) {
                res.status(200).json({ message: 'Quiz deleted successfully' });
            } else {
                res.status(404).json({ error: 'Quiz not found' });
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }
}
