

// ! Data log


import { log } from "console";
import {Food, Person, Space} from "../backend"
import { ArguFood } from "../backend/types/allTypes"

let testingDate:string = "2.11.24"
let testingStatus:string = "unknown"

function finish(){
    log();
    log();
    log();
    log();
    log();
    log("Test Tarihi:"+testingDate);
    log("Test durumu:"+testingStatus);
}

const space = new Space();

let name = "John Smith"
const age = 18
const weight = 70
const height = 182
const strength = 25
const gender = "male"

const person = new Person(name,age,weight,height,strength,gender);
// let sael = person.RightHand;
// let solel = person.LeftHand;

// console.log("sağ el boş mu?"+sael.IsNull());
// console.log("sol el boş mu?"+solel.IsNull());



let argumsFFood: ArguFood = {
    forWhoEatable: {
        "human": true,
    },
}

let apple = new Food("apple",1,1,1,1,12,argumsFFood);

// ! TESTED And actions is good

// console.log(person.getObject(apple,"left"));// aldı
// console.log(person.getObject(apple,"right"));// aldı

// log("sol el durumu:"+person.IsHandFull(true))
// log("sağ el durumu:"+person.IsHandFull(false,true))
// log("--------------------");
// log("sol el durumu:"+person.whatITheHand(true))
// log("sağ el durumu:"+person.whatITheHand(false,true))

// // console.log("sağ el boş mu?"+sael.IsNull());
// // console.log("sol el boş mu?"+solel.IsNull());
// // console.log(person.getObject(apple,"right")); // aldı
// console.log("--------------------");

// // console.log(person.nulluk(true,false)); // aldıysa sol el false
// // console.log("sol el boş mu?"+solel.IsNull());
// // console.log(person.nulluk(false,true)); // aldıysa sağ el false
// // console.log("sağ el boş mu?"+sael.IsNull());
// // console.log(person.IsAllHandFull);

// console.log();
// console.log();
// console.log();
// log("isHand full func ret:"+person.IsHandFull(true,true));

// console.log("--------------------");
// // console.log(apple.area()); // 1
// // console.log(person.giveObject(apple,space,"left")) // on the Space oke.
// console.log(person.eat(apple,"left"));
// log(person.AreBothHandsFull)
// console.log(person.whatITheHand(true)); // is empty
// console.log(person.whatITheHand(false,true));
// log(person.giveObject(apple,person,"right"))
// console.log(person.whatITheHand(true));
// // console.log(person.Info());

// log("--------------------");
// log("sol el durumu:"+person.IsHandFull(true))
// log("sağ el durumu:"+person.IsHandFull(false,true))
// log("--------------------");


// ? smash section

log(person.getObject(apple,"left"))
log(person.smashTObj(apple,"Horizontal",2,"left"))
log("sol el durumu:"+person.IsHandFull(true))
log(person.whatITheHand(true));

testingStatus = "smash is not yet"

finish()


