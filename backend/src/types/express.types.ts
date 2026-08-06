import type {RequestHandler} from "express";
import type { ParsedQs } from "qs";

export interface RouteParams {
  [key: string]: string | string[];
}

export type Controller<
  ReqBody = unknown,
  ResBody = unknown,
  Params extends RouteParams = RouteParams,
  ReqQuery extends ParsedQs = ParsedQs,
> = RequestHandler<Params, ResBody, ReqBody, ReqQuery>;
