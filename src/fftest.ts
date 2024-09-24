import { Beverage, Doctor, Food } from "./backend";
import { print } from "../../CustomPrint/Print"
import { ArguBeverage, ArguFood } from "./backend/types/allTypes";

// ? Person 

let a = new Doctor("ali",24,85,180,"male","Brain","Gulgor");
console.log(a.Info());
// console.log(a.BrainValues);

print(a.CompanyName) // Gulgor 
print(a.Branch) // Brain
print(a.CompanyType) // Hospital
print(a.IsAllHandFull) // false
print(a.Job) // Doctor
print(a.area()) // nevermind

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
        "animal": true,
    },
}

let apple = new Food("apple", 1, 12, argumsFFood);
let appleJuice = new Beverage("appleJuice",argumsFBeverages,8);

