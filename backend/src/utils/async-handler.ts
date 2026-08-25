import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";


export function asyncHandler<
  ReqBody = unknown,
  ResBody = unknown,
  Params extends ParamsDictionary = ParamsDictionary,
  ReqQuery extends ParsedQs = ParsedQs,
>(
  fn: (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
