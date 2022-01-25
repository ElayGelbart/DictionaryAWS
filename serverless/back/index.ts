import { app as server } from "./app";
//@ts-ignore
import httpLambda from "aws-lambda-http-server";
const port = process.env.PORT || 8080;
export const proxy = httpLambda;

server.listen(port, () => console.log(`listening on ${port}`));
