import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
import jsonFile from "../dictionary.json";
const addItems2DDB = async () => {
  for (const word of jsonFile as []) {
    const params = {
      TableName: "DictionaryEnglish",
      Item: word,
    };
    const logger = await ddb
      .put(params, (err, data) => {
        if (err) return err;
        return data;
      })
      .promise();
    console.log(logger);
  }
};
addItems2DDB();
