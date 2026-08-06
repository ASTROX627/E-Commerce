import { ValidationError } from "../errors/http-errors.js";
export function validate(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            for (const issue of result.error.issues) {
                const field = issue.path.join(".");
                errors[field] = [...(errors[field] ?? []), issue.message];
            }
            return next(new ValidationError(errors));
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validation.js.map