import AWS from "aws-sdk";
import fs from "fs";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
import jsonFile from "./newdic.json";
const wow: [] = jsonFile as [];
const addItems2DDB = async () => {
  for (let i = 0; i < wow.length; i++) {
    const params = {
      TableName: "DictionaryEnglish",
      Item: wow[i],
    };
    const logger = await ddb
      .put(params, (err, data) => {
        if (err) return err;
        return data;
      })
      .promise();
    //@ts-ignore
    console.log(logger, wow[i].word, i);
  }
};
//addItems2DDB();
process.on("uncaughtException", () => {
  console.log("unchasdadsdasdfas sdasdfads fa sfdasdf");
});
process.on("uncaughtExceptionMonitor", () => {
  console.log("expect monito aasfdfkladsljkljfasljkfasdljkafsdljkafdsjkl");
});
process.on("unhandledRejection", () => {
  console.log(
    "rejection adsf asdfasdf asdfasdfdasf asdf adfasdfasdf sadfsadf sadf"
  );
});
process.on("rejectionHandled", () => {
  console.log("rejection handker asdfadsflkdasfn kjansdlk fnaslknd fkl");
});
const scanItems = async () => {
  let itemsArray: any[] = [];
  const result = await ddb.scan({ TableName: "DictionaryEnglish" }).promise();
  itemsArray = itemsArray.concat(result.Items);
  console.log(result);
  const scanRetry = async (lastKey: any) => {
    const resultRetry = await ddb
      .scan({ TableName: "DictionaryEnglish", ExclusiveStartKey: lastKey })
      .promise();
    itemsArray = itemsArray.concat(resultRetry.Items);
    if (resultRetry.LastEvaluatedKey) {
      await scanRetry(resultRetry.LastEvaluatedKey);
    }
  };
  await scanRetry(result.LastEvaluatedKey);
  console.log(itemsArray, "items in arrayyyy");
  fs.writeFileSync("pleasework.json", JSON.stringify(itemsArray));
  // const stringArray = itemsArray.map((m) => JSON.stringify(m));
  // const mySet = console.log(
  //   wow.filter((n) => !stringArray.includes(JSON.stringify(n)))
  // );
};
scanItems();
