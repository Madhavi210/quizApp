import { Request, Response } from 'express';
import { controller, httpGet, httpDelete, httpPost, request, response } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { inject } from 'inversify';
import { IResultService } from '../services/result.service';
import { IResult } from '../interfaces/IResult';
import { TYPES } from '../config/types';
import { ResultModel } from '../models/result.model';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { log } from 'console';
const authMiddleware = new AuthMiddleware();

@controller('/result')
export class ResultController {
    constructor(
        @inject(TYPES.ResultService) private readonly resultService: IResultService 
    ){}

    @httpGet('/')
    async getAllResults(req: Request,  res: Response): Promise<void> {
        try {
            const results = await this.resultService.findAllResults();
            res.status(200).json(results); // Send the fetched results in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpGet('/:quizId')
    async getResultById(req: Request, res: Response): Promise<void> {
        try {
            const { quizId, userId } = req.params;
            const result = await this.resultService.findResultById(quizId, userId);
            if (!result) {
                res.status(404).json({ error: 'Result not found' });
            } else {
                res.status(200).json(result); // Send the fetched result in the response
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpPost('/:quizId' )
    async createResult(req: Request, res: Response): Promise<void> {
        try {
            // const resultData: IResult = req.body;
            // const token = req.headers.authorization.split(' ')[1]; 

            const quizId = req.params.quizId;
            const {score, totalQuestions, grade , userId} = req.body;
            // console.log(score, quizId, userId);
            
            // const userId = req.userData;
            const result = new ResultModel({
                quiz: quizId,
                user: userId,
                score,
                totalQuestions,
                grade,
                attemptedAt: new Date()
              });
            //   console.log(result);
              
              const createResult = await result.save();

            // const newResult = await this.resultService.createResult(resultData);
            res.status(201).json(createResult); // Send the created result in the response
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpDelete('/:id')
    async deleteResult(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const deleted = await this.resultService.deleteResult(id);
            if (deleted) {
                res.status(200).json({ message: 'Result deleted successfully' });
            } else {
                res.status(404).json({ error: 'Result not found' });
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }

    @httpPost('/:id')
    async updateResult(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const resultData: IResult = req.body;
            const updatedResult = await this.resultService.updateResult(id, resultData);
            if (updatedResult) {
                res.status(200).json(updatedResult); // Send the updated result in the response
            } else {
                res.status(404).json({ error: 'Result not found' });
            }
        } catch (error:any) {
            res.status(500).json({ error: error.message }); // Send the error message in the response
        }
    }
}
