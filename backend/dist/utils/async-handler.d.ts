import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ParsedQs } from "qs";
import type { RouteParams } from "../types/express.types.ts";
export declare function asyncHandler<ReqBody = unknown, ResBody = unknown, Params extends RouteParams = RouteParams, ReqQuery extends ParsedQs = ParsedQs>(fn: (req: Request<Params, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => Promise<void>): RequestHandler<Params, ResBody, ReqBody, ReqQuery>;
//# sourceMappingURL=async-handler.d.ts.map