import { ABOUT_BLANK, AppError, standardTitleFor, } from "../errors/app-error.js";
import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
const PROBLEM_TYPE_BASE = "https://example.com/problems";
export function errorHandler(err, req, res, _next) {
    if (err instanceof AppError) {
        res
            .status(err.status)
            .type("application/problem+json")
            .json(err.toProblemDetails(req.originalUrl));
        return;
    }
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = {};
        for (const [field, validationError] of Object.entries(err.errors)) {
            errors[field] = [validationError.message];
        }
        res
            .status(422)
            .type("application/problem+json")
            .json({
            type: `${PROBLEM_TYPE_BASE}/validation-error`,
            title: "Validation Failed",
            status: 422,
            detail: "One or more fields are invalid.",
            instance: req.originalUrl,
            errors,
        });
    }
    if (typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === 11000) {
        res
            .status(409)
            .type("application/problem+json")
            .json({
            type: `${PROBLEM_TYPE_BASE}/conflict`,
            title: "Conflict",
            status: 409,
            detail: "A resource with this value already exists.",
            instance: req.originalUrl,
        });
        return;
    }
    logger.error("Unhandled error", err);
    res
        .status(500)
        .type("application/problem+json")
        .json({
        type: ABOUT_BLANK,
        title: standardTitleFor(500),
        status: 500,
        instance: req.originalUrl,
    });
}
//# sourceMappingURL=error-handler.js.map