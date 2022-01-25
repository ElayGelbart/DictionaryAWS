import { app as server } from "./app";
const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`listening on ${port}`));
