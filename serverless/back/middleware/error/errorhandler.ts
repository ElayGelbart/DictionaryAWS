import { NextFunction, Response, Request, Errback } from "express";
interface ErrorHandler extends Errback {
  status: number;
  msg: string;
}
export default function errorHandler(
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.status) {
    return res.status(err.status).send(err.msg);
  }
  return res.status(500).send("internal Server Problem");
}
