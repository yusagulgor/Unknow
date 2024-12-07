// ? All Types

import {Article,Space, Brain, Food, BinBrain, Stomach} from "../fal"

import { Doctor, 
    Engineer, 
    Manager, 
    Person, 
    Student, 
    Teacher } from "../people";

export let throwError = (errorMsg: string): never => {throw new Error(errorMsg);};     
export let OneLineCheck = (control:boolean,ret:string)=>{if(control) return ret};

// console.log(OneLineCheck("lale" =="lale","true"))
// ? Binary Types     

export type memory = 0|1;
export type allMem = memory | memory[];
export type BinBrainCells = { [key: string]: allMem };

// ? Normaly Brain Types

export type bcv = string | number
export type BrainCells =  { [key: string]: bcv };

export type hands = "right" | "left" | "allHands"

interface OwnMemoryFuncs {

    add(val:memory|memory[]):string;
}

interface Area{
    // width is x , height is y , lenght is z
    area():number;
}

interface GetObj {
    getObj(obj: Article): string; 
}

type Who = {
    [key: string]: boolean ;
}


type Argu = {
    forWhoUse?: Who;
    forWhoEatable?: Who;
    forWhoDrinkable?: Who;
};

type fhe = 'human' | 'animal'; 
type fhd = 'human' | 'animal';  

// Argu tanımları
type ArguFood = {
    forWhoEatable?: {
        [key in fhe]?: boolean;  
    };
}

type ArguBeverage = {
    forWhoDrinkable?: {
        [key in fhd]?: boolean;  
    };
}

export type size = "XS"|"S"|"M"|"L"|"XL"|"XXL";
export type fw = "had"|"face"|"neck"|"body"|"foots"|"foot"|"hand";
export type ClothType = "jumper"|"shirt"|"trousers"|"accessory"|"glove";
export interface Wearable{
    readonly forWhere:fw;
    wear();
}

export interface stomachT{
    get(food:Food):string;
}

type Enumerate<N extends number, Acc extends number[] = []> = 
  Acc["length"] extends N 
    ? Acc[number] 
    : Acc["length"] extends 1000 
      ? never 
      : Enumerate<N, [...Acc, Acc['length']]>;

type Rangee<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
export type cm = Rangee<0, 999>;

type Degree = Rangee<1,5>;
type Exp = Rangee<1,36>;

// * School 

type SchoolType = "Primary" | "Middle" | "Anatolian" | "University";

interface StudentT {
    applyToSchool(schoolName:string):void;
}

// * Worker 

interface CompanyT{
addNewWorkers(newWorkers:Person|Person[]):void|string;
}

interface SchoolT {
    addNewTeachers(newTeacher: Teacher|Teacher[]):void;
    addNewStudents(newStudent: Student|Student[]):void;
}

interface TechnologyT {
    addNewEngineers(newWorkers : Engineer|Engineer[]):void ;
}

interface HospitalT {
    addNewDoctor(newDoctor: Doctor|Doctor[]):void;
}

type SmallBusinessEx = "Grocery" | "Restaurant";
interface SmallBusinessT{

}


type CompanyType = "Hospital" | "School" | "Technology" | "SmallBusiness";
interface WorkerT {
}

type DocBranchs = "Brain" | "Internal"
interface DoctorT extends WorkerT{

}

interface ManagerT extends WorkerT{

}

type TeacherDepartment = "Math" | "Computer" | "Science" | "History" | "Biyology";
interface TeacherT extends WorkerT{

}

type EngineerDepartment = "Computer" | "Machine" | "Electronics" | "Biochemistry" ;
interface EngineerT extends WorkerT{

}

type Gender = "male" | "female" ;
type Jobs =  null | "Student" | "Entrepreneur" | "Worker" | "Manager" | "Teacher" | "Doctor" | "Engineer" | "Waiter" | "Cashier";
type Age = Rangee<0,91>;
type Weight = Rangee<0,121>;
type Strength = Rangee<20,41>;
type Height = Rangee<155,211>;
type PeopleWeight = Rangee<40,121>;
type HungPoint = Rangee<0,101>;


interface PersonT{
    Info(): string;
    getObject(obj:Article,whand:hands):string;
    giveObject(obj:Article,where:Space|Person|Stomach,whand:hands):string;
    IsHandFull(left:boolean,right:boolean):string|undefined;
    eat(food:Food,whand:hands):string;
    // drink(beverage:Beverage):string;
}


// ? For General
export{
    Area,
    fhe,
    fhd,
    GetObj,
    Rangee,
    Degree,
    Exp,
    Argu,
    ArguBeverage,
    ArguFood,
    Age,
    Gender,
    Jobs,
    Weight,
    Height,
    PeopleWeight,
    HungPoint,
    Strength
}

// ? For People
export{
    PersonT,
    WorkerT,
    StudentT,
    TeacherT,
    ManagerT,
    EngineerT,
    DoctorT,
}

export{
    SmallBusinessEx,
    EngineerDepartment,
    TeacherDepartment,
    DocBranchs,
    SchoolType,
}

// ? For Comp

export {
    CompanyType,
    CompanyT,
    SchoolT,
    TechnologyT,
    SmallBusinessT,
    HospitalT,
};