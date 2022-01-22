import fs from "fs";
import dict from "jsonDictionary!./dictionary.json";
import myDic from "jsonDictionary!./myDictionary.json";
const compare = dict.filter(
  (obj: Word.Item) =>
    !myDic.find(
      (myObj: Word.Item) => obj.word === myObj.word && obj.pos === myObj.pos
    )
);
fs.writeFileSync("subDictionary.json", JSON.stringify(compare));
console.log(compare);
