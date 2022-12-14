import { ErrorRequestHandler } from 'express';
import { mapValues } from 'lodash';
import { ZodError, ValidationError, HttpError } from 'shared';

// need to disable this rule so that express recognises this signature
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json(err);
        return;
    }

    if (err instanceof ZodError) {
        const fields = mapValues(
            err.flatten().fieldErrors,
            (value) => value?.[0],
        );

        const validationError = new ValidationError(err.message, fields);
        res.status(validationError.status).json(validationError);
        return;
    }

    res.status(500).json({ message: 'Internal server error' });
};
