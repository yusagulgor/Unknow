import { Article, Beverage, Doctor, Food, Space } from "../backend";
import { print } from "../../../CustomPrint/Print"
import { ArguBeverage, ArguFood } from "../backend/types/allTypes";
import { log } from "console";

let space = new Space();

// ? Person 

let doctor = new Doctor("ali",24,85,180,39,"male","Brain","Gulgor");

// // console.log(a.BrainValues);
// print("Person: " + doctor)
// console.log(doctor.Info());
// print(doctor.CompanyName) // Gulgor
// // console.log(doctor.Branch) 
// print(doctor.Branch) // Brain
// print(doctor.CompanyType) // Hospital
// print(doctor.AreBothHandsFull) // false
// print(doctor.Job) // Doctor
// print(doctor.area()) // nevermind
// print(doctor.IsHandFull())


// ? Food 

// let argums: Argu = {
//     forWhoEatable: {
//         "human": true,
//     },
//     forWhoDrinkable: {},
//     forWhoUse: {}
// }

let argumsFFood: ArguFood = {
    forWhoEatable: {
        "human": true,
    },
}

let argumsFBeverages: ArguBeverage = {
    forWhoDrinkable: {
        "human": true,
        "animal":true,
    },
}

let apple = new Food("apple",1,1,1,1,12,argumsFFood);
let balyas = new Article(0,"balias",40,6,20,10);
// let appleJuice = new Beverage("appleJuice",argumsFBeverages,8);

print("--------------------------------------------------------")
// print("Fruits: " + apple)
// print(apple.Height)//undefined
// print(apple.Lenght)//undefined
// print(apple.Width)//undefined
// print(apple.Weight)// kg
// print(apple.Name)// name

print(apple.forWhoEat("human")) // true
log(doctor.getObject(balyas,"left"));
print(doctor.getObject(balyas,"allHands"))
print(doctor.Info())
print(doctor.giveObject(balyas,space,"right"))
print(doctor.Info())


// print(doctor.getObject(apple,"left"))
// print(doctor.IsHandFull(true))
// print(doctor.whatITheHand(true))

// print(doctor.giveObject(doctor.LeftHand.inTheObject,space,))

// print(doctor.getObject(apple,doctor.LeftHand));
// print(doctor.IsAllHandFull)

