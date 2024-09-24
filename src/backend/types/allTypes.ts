// ? All Types

import {Hand,Article,Space, Brain, Food, Beverage} from "../fal"

import { Doctor, 
    Engineer, 
    Manager, 
    Person, 
    Student, 
    Teacher } from "../people";

export type memory = 0|1;
export type allMem = memory | memory[];
export type BrainCells = { [key: string]: allMem };
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

interface Get{
    get(obj:Article,IsTHO?:boolean): any;
}

interface Give{
    give(obj:Article,where:Space): any;
}

type Enumerate<N extends number,Acc extends number[] = []> = Acc["length"] extends N ? Acc[number]: Enumerate<N,[...Acc , Acc['length']]>;
type Rangee<F extends number,T extends number> = Exclude<Enumerate<T>,Enumerate<F>>;
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
type Jobs =  null | "Student" | "Entrepreneur" | "Worker" | "Manager" | "Teacher" | "Doctor" | "Engineer";
type Age = Rangee<0,91>;
type Weight = Rangee<0,120>;
type Height = Rangee<155,211>;
type PeopleWeight = Rangee<40,120>;
type HungPoint = Rangee<0,101>;

interface PersonT{
    Info(): string;
    getObject(obj:Article,whand:Hand):string;
    giveObject(obj:Article,where:Space|Hand,whand:Hand):string;
    IsHandFull(left:boolean,right:boolean):string|undefined;
    eat(food:Food,whand:Hand):string;
    drink(beverage:Beverage):string;
}

abstract class PersonC extends Article implements PersonT{

    protected abstract brain:Brain;
    protected abstract name: string;
    protected abstract age: Age;
    protected abstract gender: Gender;
    protected abstract job: Jobs;
    protected abstract leftHand: Hand;
    protected abstract rightHand: Hand;
    protected abstract AllhandIsFull: boolean;

    abstract IsHandFull(left:boolean,right:boolean):string|undefined;
    abstract getObject(obj:Article,whand:Hand):string;
    abstract giveObject(obj:Article,where:Space|Hand,whand:Hand):string;

    abstract eat(food: Food,wHand:Hand): string;
    abstract drink(beverage:Beverage): string;

    abstract area(): number;
    abstract Info(): string ;
} 

abstract class CubicArea extends Space implements GetObj{
    protected abstract isNull: boolean;
    protected abstract objs: Article[];
    protected abstract capacity: number;
    protected abstract fullsCap: number;

    abstract get GetArts(): Article[];
    abstract getObj(obj: Article):string;
}

abstract class Room extends CubicArea {
    protected abstract isNull: boolean;
    protected abstract objs: Article[];
    protected abstract capacity: number;
    protected abstract fullsCap: number;

    abstract get GetArts(): Article[];
    abstract getObj(obj: Article):string;
}

// ? For General
export{
    Area,
    fhe,
    fhd,
    Get,
    Give,
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
}

// ? For People
export{
    PersonC,
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