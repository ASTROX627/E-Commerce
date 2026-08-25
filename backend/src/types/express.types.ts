import type {RequestHandler} from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

export type Controller<
  ReqBody = unknown,
  ResBody = unknown,
  Params extends ParamsDictionary = ParamsDictionary,
  ReqQuery extends ParsedQs = ParsedQs,
> = RequestHandler<Params, ResBody, ReqBody, ReqQuery>;
