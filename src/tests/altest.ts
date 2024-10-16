// ? People imports

import {Person,
    Doctor,
    Engineer,
    Teacher,
    Student,
    Manager,
} from '../backend'

// ? Company imports

import {
    School,
    Technology,
    SmallBusiness,
    Hospital
} from '../backend'

// ? General imports

import {
    Food,
} from '../backend'

import { ArguFood } from '../backend/types/allTypes'



// * People definitions

let name = "John Smith"
const age = 18
const weight = 70
const height = 182
const strength = 25
const gender = "male"

const person = new Person(name,age,weight,height,strength,gender,null);

let companyName = "Gulgor"

const doctor = new Doctor(name,age,weight,height,strength,gender,"Internal",companyName);
const engineer = new Engineer(name,age,weight,height,strength,gender,companyName,"Computer");
const teacher = new Teacher(name,age,weight,height,strength,gender,"Math",companyName);
const student = new Student(name,age,weight,height,strength,gender);

const managerH = new Manager(name,age,weight,height,strength,gender,companyName,"Hospital");
const managerS = new Manager(name,age,weight,height,strength,gender,companyName,"School");
const managerSma = new Manager(name,age,weight,height,strength,gender,companyName,"SmallBusiness");
const managerT = new Manager(name,age,weight,height,strength,gender,companyName,"Technology");


// * Company definitions

const hospital = new Hospital(companyName,managerH);
const school = new School(companyName,managerS);
const smab = new SmallBusiness(companyName,managerSma,"Grocery");
const technology = new Technology(companyName,managerT);


// * General definitions

let argumsFFood: ArguFood = {
    forWhoEatable: {
        "human": true,
    },
}

let apple = new Food("apple", 1, 12, argumsFFood);