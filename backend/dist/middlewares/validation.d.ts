import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
export declare function validate(schema: ZodType): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map