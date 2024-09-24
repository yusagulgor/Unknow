
import { Brain, Decoder, School, Manager, Teacher, Student, Technology, Company } from "./backend";

let decTV = "ali";
let deTV = 12;

let dedTV = Decoder.retToDecode(decTV)
let dTV = Decoder.retToDecode(deTV)

console.log(dedTV);
console.log(dTV);

let exTV = Decoder.explain(dedTV);
let eTV = Number(Decoder.explain(dTV))

console.log(typeof exTV === "string"); 
console.log(typeof Number(eTV) === "number"); 

console.log(exTV); 
console.log(Number(eTV)); 
