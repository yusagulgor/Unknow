
// ! Data log
// ! Give Hand

import { log } from "console";
import {Food, Person, Space} from "../backend"
import { ArguFood } from "../backend/types/allTypes"

const space = new Space();

let name = "John Smith"
const age = 18
const weight = 70
const height = 182
const strength = 25
const gender = "male"

const person = new Person(name,age,weight,height,strength,gender);
let sael = person.RightHand;
let solel = person.LeftHand;

console.log("sağ el boş mu?"+sael.IsNull());
console.log("sol el boş mu?"+solel.IsNull());



let argumsFFood: ArguFood = {
    forWhoEatable: {
        "human": true,
    },
}

let apple = new Food("apple",1,1,1,1,12,argumsFFood);


console.log(person.getObject(apple,"left"));// aldı
console.log(person.getObject(apple,"right"));// aldı

console.log("sağ el boş mu?"+sael.IsNull());
console.log("sol el boş mu?"+solel.IsNull());
// console.log(person.getObject(apple,"right")); // aldı
console.log("--------------------");

console.log("sağ el durumu:"+person.IsHandFull(false,true));
console.log("--------------------");
console.log(person.nulluk(true,false)); // aldıysa sol el false
console.log("sol el boş mu?"+solel.IsNull());
console.log(person.nulluk(false,true)); // aldıysa sağ el false
console.log("sağ el boş mu?"+sael.IsNull());
// console.log(person.IsAllHandFull);

console.log();
log(person.IsHandFull(true,true));


// console.log(apple.area()); // 1
// console.log(person.giveObject(apple,space,"left")) // on the Space oke.
console.log(person.eat(apple,"left"));
log(person.AreBothHandsFull)
console.log(person.whatITheHand(true)); // is empty
console.log(person.whatITheHand(false,true)); // is empty
log(person.giveObject(apple,person,"right"))
console.log(person.whatITheHand(true)); // is empty
// console.log(person.Info());

