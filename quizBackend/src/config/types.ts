// src/config/types.ts
const TYPES = {
    UserService: Symbol.for('UserService'),
    UserRepository: Symbol.for('UserRepository'),
    UserController: Symbol.for('UserController'),
    QuizService: Symbol.for('QuizService'),
    QuizRepository: Symbol.for('QuizRepository'),
    QuizController: Symbol.for('QuizController'),
    QuestionService: Symbol.for('QuestionService'),
    QuestionRepository: Symbol.for('QuestionRepository'),
    QuestionController: Symbol.for('QuestionController'),
    ResultService: Symbol.for('ResultService'),
    ResultRepository: Symbol.for('ResultRepository'),
    ResultController: Symbol.for('ResultController'),

    AuthMiddleware: Symbol.for('AuthMiddleware'),
};

export { TYPES };