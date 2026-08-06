import type { Request, RequestHandler, Response } from "express";
import type { Controller } from "../../../types/express.types.ts";
import type { SignupRequestBody, SignupResponseBody } from "../types/auth.types.ts";
export declare const signup: Controller<SignupRequestBody, SignupResponseBody>;
export declare const login: RequestHandler;
export declare const logout: RequestHandler;
export declare const test: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=aut.controller.d.ts.map