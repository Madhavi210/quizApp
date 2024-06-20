// src/config/inversify.config.ts
import { Container } from 'inversify';
import { TYPES } from './types';

// Services
import { IUserService, UserService } from '../services/user.service';
import { IQuizService, QuizService } from '../services/quiz.service';
import { IQuestionService, QuestionService } from '../services/question.service';
import { ResultService } from '../services/result.service';

// Controllers
import { UserController } from '../controllers/user.controller';
import { IResultService } from '../services/result.service';
import { QuizController } from '../controllers/quiz.controller';
import { QuestionController } from '../controllers/question.controller';
import { ResultController } from '../controllers/result.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const container = new Container();

// Bindings
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<IQuizService>(TYPES.QuizService).to(QuizService);
container.bind<QuizController>(TYPES.QuizController).to(QuizController);

container.bind<IQuestionService>(TYPES.QuestionService).to(QuestionService);
container.bind<QuestionController>(TYPES.QuestionController).to(QuestionController);

container.bind<IResultService>(TYPES.ResultService).to(ResultService);
container.bind<ResultController>(TYPES.ResultController).to(ResultController);

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();

export { container };