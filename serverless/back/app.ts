import express from "express";
import cors from "cors";
import getByWordController from "./controller/getByWord";
import getByPartOfSpeech from "./controller/getByPartOfSpeech";
import getByWordByPartOfSpeech from "./controller/getByWordByPartOfSpeech";
import errorHandler from "./middleware/error/errorhandler";
export const app = express();
app.use(cors());

app.use((req, res, next) => {
  console.log("req", req);
  console.log("res", res);
  next();
});

app.get("/:word", getByWordController);

app.get("/partOfSpeech/:part", getByPartOfSpeech);

app.get("/:word/:partOfSpeech", getByWordByPartOfSpeech);

app.use(errorHandler);
