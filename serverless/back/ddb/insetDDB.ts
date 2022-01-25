import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
import jsonFile from "jsonDictionary!./dictionary.json";
const addItems2DDB = async () => {
  for (let wordData of jsonFile) {
    const params = {
      TableName: "DictionaryEnglish",
      Item: wordData,
    };
    const response = await ddb
      .put(params, (err, data) => {
        if (err) return err;
        return data;
      })
      .promise();
    console.log(response, wordData.word);
  }
};
addItems2DDB();
