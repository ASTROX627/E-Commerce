import { HTTP_STATUS_PHRASES } from "../constants/http-status-phrases.js";
export const ABOUT_BLANK = "about:blank";
export class AppError extends Error {
    type;
    title;
    detail;
    extensions;
    constructor(title, detail, extensions, type = ABOUT_BLANK) {
        super(detail ?? title);
        this.title = title;
        this.detail = detail;
        this.extensions = extensions;
        this.type = type;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace?.(this, this.constructor);
    }
    toProblemDetails(instance) {
        return {
            type: this.type,
            title: this.title,
            status: this.status,
            ...(this.detail ? { detail: this.detail } : {}),
            ...(instance ? { instance } : {}),
            ...(this.extensions ?? {}),
        };
    }
}
export function standardTitleFor(status) {
    return HTTP_STATUS_PHRASES[status] ?? "Unknown Error";
}
//# sourceMappingURL=app-error.js.map