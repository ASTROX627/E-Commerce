import { ABOUT_BLANK, standardTitleFor } from "../errors/app-error.js";
export function notFoundHandler(req, res) {
    res
        .status(404)
        .type("application/problem+json")
        .json({
        type: ABOUT_BLANK,
        title: standardTitleFor(404),
        status: 404,
        detail: `The route ${req.method} ${req.originalUrl} does not exist.`,
        instance: req.originalUrl,
    });
}
//# sourceMappingURL=not-found.js.map