import type { NextFunction, Request, RequestHandler, Response } from "express";
export declare function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler;
//# sourceMappingURL=async-handler.d.ts.map