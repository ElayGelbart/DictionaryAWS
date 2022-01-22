const dict = require("./dictionary.json");
const mydic = require("./pleasework.json");
const fs = require("fs")
const compare = dict.filter((obj) => !mydic.find(myobj => (obj.word === myobj.word && obj.pos === myobj.pos)))
fs.writeFileSync("newdic.json", JSON.stringify(compare))
console.log(compare);
