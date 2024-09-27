import { Beverage, Doctor, Food, Space } from "../backend";
import { print } from "../../../CustomPrint/Print"
import { ArguBeverage, ArguFood } from "../backend/types/allTypes";

let space = new Space();

// ? Person 

let doctor = new Doctor("ali",24,85,180,"male","Brain","Gulgor");

// console.log(a.BrainValues);
print("Person: " + doctor)
console.log(doctor.Info());
print(doctor.CompanyName) // Gulgor 
print(doctor.Branch) // Brain
print(doctor.CompanyType) // Hospital
print(doctor.IsAllHandFull) // false
print(doctor.Job) // Doctor
print(doctor.area()) // nevermind
print(doctor.IsHandFull())


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

let apple = new Food("apple", 1, 12, argumsFFood);
// let appleJuice = new Beverage("appleJuice",argumsFBeverages,8);

print("--------------------------------------------------------")
print("Fruits: " + apple)
print(apple.Height)//undefined
print(apple.Lenght)//undefined
print(apple.Width)//undefined
print(apple.Weight)// kg
print(apple.Name)// name

print(apple.forWhoEat("human")) // true

print(doctor.getObject(apple,doctor.LeftHand))
print(doctor.IsHandFull(true))

// print(doctor.giveObject(doctor.LeftHand.inTheObject,space,))

// print(doctor.getObject(apple,doctor.LeftHand));
// print(doctor.IsAllHandFull)
