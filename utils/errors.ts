import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
    constructor(
        public message: string,
        public directory?: string,
        public type?: string,
        ) {
        super();
    }
}

export const handleError = async (err: ValidationError, req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.error(err);
    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Sorry something went wrong. Try again later.',
        });


};
