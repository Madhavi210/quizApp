import { Request, Response } from 'express';
import { controller, httpGet, httpDelete, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IQuestionService } from '../services/question.service';
import { IQuestion } from '../interfaces/IQuestion';
import { TYPES } from '../config/types';

@controller('/questions')
export class QuestionController {
    constructor(
        @inject(TYPES.QuestionService) private readonly questionService: IQuestionService 
    ){}

    @httpGet('/')
    async getAllQuestions(req: Request,  res: Response): Promise<void> {
        try {
            const questions = await this.questionService.findAllQuestions();
            res.status(200).json(questions); // Send the fetched questions in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpGet('/:id')
    async getQuestionById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const question = await this.questionService.findQuestionById(id);
            if (!question) {
                res.status(404).json({ error: 'Question not found' });
            } else {
                res.status(200).json(question); // Send the fetched question in the response
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpPost('/')
    async createQuestion(req: Request, res: Response): Promise<void> {
        try {
            const questionData: IQuestion = req.body;
            const newQuestion = await this.questionService.createQuestion(questionData);
            res.status(201).json(newQuestion); // Send the created question in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpDelete('/:id')
    async deleteQuestion(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const deleted = await this.questionService.deleteQuestion(id);
            if (deleted) {
                res.status(200).json({ message: 'Question deleted successfully' });
            } else {
                res.status(404).json({ error: 'Question not found' });
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }
}
