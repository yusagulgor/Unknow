
import * as readline from 'readline';

import { PersonC,
    DoctorT,
    EngineerT,
    StudentT,
    TeacherT,
    ManagerT,
    Weight,
    Height,
    BrainCells,
    PeopleWeight,
    HungPoint
 } from './types/allTypes';

import {
    Age,
    Gender,
    Jobs,
    DocBranchs,
    CompanyType,
    TeacherDepartment,
    SchoolType,
    EngineerDepartment
    } from './types/allTypes';

import { Hand,Article, Brain, Space, Decoder, Food, Beverage } from './fal';


class Person extends PersonC {

    protected name: string;
    protected age: Age;
    protected leftHand: Hand = new Hand("left", 10);
    protected rightHand: Hand = new Hand("right", 10);
    protected gender: Gender;
    // protected hungryPoint: HungPoint = 0;
    protected job: Jobs;
    protected brain: Brain;
    protected companyName: string = "";
    
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    protected AllhandIsFull: boolean;

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height, gender: Gender, job: Jobs) {
        super(name,weight,10,height,6);
        this.name = name;
        this.age = age;
        this.job = job;
        this.gender = gender;
        this.AllhandIsFull = !this.leftHand.IsNull() && !this.rightHand.IsNull();
        this.brain = new Brain();
        this.initMemory();
    }

    private initMemory(): void {
        let dname = Decoder.retToDecode(this.name);
        let dage = Decoder.retToDecode(this.age);
        let dweight = Decoder.retToDecode(this.weight!);
        let dgender = Decoder.retToDecode(this.gender, true);
        let dheight = Decoder.retToDecode(this.height!, true);
        let djob = Decoder.retToDecode(this.job!);

        this.brain.add("Name", dname);
        this.brain.add("Age", dage);
        this.brain.add("Weight", dweight);
        this.brain.add("Gender", dgender);
        this.brain.add("Height", dheight);
        this.brain.add("Job", djob);
        this.brain.add("leftHand",Decoder.retToDecode("boş"));
        this.brain.add("rightHand", Decoder.retToDecode("boş"));

    }

    public get BrainValues(): BrainCells {
        return this.brain.MemoryValues;
    }

    public set Weight(newWeight: Weight) {
        let decodedWeight = Decoder.retToDecode(newWeight);
        const updateStatus = this.brain.updateNameOfValue("Weight", decodedWeight);
        if (updateStatus === "value is updated") {
            this.brain.updateNameOfValue("Weight", decodedWeight);
            this.weight = newWeight;
        } else {
            throw new Error(updateStatus);
        }
    }

    public set Age(newAge: Age) {
        let decodedAge = Decoder.retToDecode(newAge);
        const updateStatus = this.brain.updateNameOfValue("Age", decodedAge);
        if (updateStatus === "value is updated") {
            this.brain.updateNameOfValue("Age", decodedAge);
            this.age = newAge;
        } else {
            throw new Error(updateStatus);
        }
    }

    public get Job(): Jobs {
        return this.job;
    }

    public set Job(newJob: Jobs) {
        this.job = newJob;
    }

    public get CompanyName(): string {
        return this.companyName;
    }

    public set CompanyName(newCompanyName: string) {
        let decodedCompanyName = Decoder.retToDecode(newCompanyName);
        const updateStatus = this.brain.updateNameOfValue("CompanyName", decodedCompanyName);
        if (updateStatus === "value is updated") {
            this.companyName = newCompanyName;
        } else {
            throw new Error(updateStatus);
        }
    }

    public get IsAllHandFull(): boolean {
        return this.AllhandIsFull;
    }

    public IsHandFull(left: boolean = false, right: boolean = false): string {
        if (!right && !left) {
            return this.AllhandIsFull ? "All hands are full" : "Not all hands are full";
        }
        if (left) {
            return this.leftHand.IsNull() ? "Left hand is empty" : "Left hand is not empty";
        }
        if (right) {
            return this.rightHand.IsNull() ? "Right hand is empty" : "Right hand is not empty";
        }
        return "Invalid hand selection";
    }

    private askForBothHands(object: Article): string| any {
        this.rl.question("Would you like to carry it with both hands? ", (answer: string) => {
            if (["yes", "evet","e"].includes(answer.toLowerCase())) {
                const leftResult = this.leftHand.get(object,true);
                const rightResult = this.rightHand.get(object,true);
                if (leftResult === rightResult) {
                    this.brain.updateNameOfValue("leftHand", Decoder.retToDecode(object.Name));
                    return leftResult;
                }
                return rightResult;
            } else {
                return "This object cannot be carried with one hand.";
            }
        });
    }

    public getObject(object: Article, hand: Hand): string {
        const result = hand.get(object);
        if (result === `bu ${object} objesini taşıyamazsın`) {
            return this.askForBothHands(object);
        } else {
            let decodedObject = Decoder.retToDecode(object.Name);
            this.brain.updateNameOfValue(hand.Name + "Hand", decodedObject);
            return result;
        }
    }

    public giveObject(object: Article, where: Space | Hand, hand: Hand): string {
        const result = hand.give(object, where);
        if (result === `${object} added` || result === `bu ${object} objesini aldın.`) {
            hand.give(object, where);
            this.brain.updateNameOfValue(hand.Name + "Hand", Decoder.retToDecode("boş"));
            return result
        }
        return result;
    }

    public eat(food:Food,whand:Hand):string{
        if(food.forWhoEat("human") && food == whand.inTheObject && !whand.IsNull()){
            return food.Name+" eated";
        }else{
            if(food != whand.inTheObject){
                return "yemek elin içinde değil";
            }else if(!food.forWhoEat("human")){
                return "insanlar için yenilebilir değil."
            }else{
                return " unknown hata , yiyemedin.";
            }
        }
    };

    public drink(beverage:Beverage):string{
        return "not yet"
    };

    public override area(): number {
        return this.width! * this.height! * this.lenght!
    }
    
    public Info(): string {
        return `Name: ${this.name}, Age: ${this.age}, Job: ${this.job}, Gender: ${this.gender}`;
    }
}

class Doctor extends Person implements DoctorT {
    private branch: DocBranchs;
    private readonly companyType: CompanyType = "Hospital";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height, gender: Gender, branch: DocBranchs, companyName: string) {
        super(name, age, weight, height, gender, "Doctor");
        this.job = "Doctor";
        this.branch = branch;
        this.companyName = companyName;
    }

    public get Branch(): DocBranchs { return this.branch; }
    public get CompanyType(): CompanyType { return this.companyType; }
    
    public set Branch(newBranch : DocBranchs) {
        this.branch = newBranch;
    }
    
}

class Engineer extends Person implements EngineerT {

    private department: EngineerDepartment;
    private readonly companyType: CompanyType = "Technology";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height, gender: Gender, companyName: string, department: EngineerDepartment) {
        super(name, age, weight, height, gender, "Engineer");
        this.job = "Engineer";
        this.companyName = companyName;
        this.department = department;
    }

    public get Department(): EngineerDepartment {return this.department;}
    public get CompanyType(): CompanyType {return this.companyType;}

    public set Department(newDepartment : EngineerDepartment) {
        this.department = newDepartment;
    }

    
}

class Student extends Person implements StudentT {
    // private schoolName: string;
    // private degree: Degree;
    // private type: SchoolType;

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height, gender: Gender) {
        super(name, age, weight, height, gender, "Student");
        this.job = "Student";
        // this.schoolName = school.Name;
        // this.degree = degree;
        // this.type = school.Type;
    }

    public applyToSchool(schoolName: string): void {
        console.log("not yet");
    }

    
    // public set SchoolName(newSchoolName : string) {
    //     this.schoolName = newSchoolName;
    // }
    
    // public set Degree(newDegree : Degree) {
    //     this.degree = newDegree;
    // }
    
    public set SchoolType(newSchoolType : SchoolType) {
        this.SchoolType = newSchoolType;
    }
    

    // public get SchoolName(): string {
    //     return this.schoolName;
    // }

    // public get Degree(): Degree {
    //     return this.degree;
    // }

    // public get SchoolType(): SchoolType {
    //     return this.type;
    // }
}

class Teacher extends Person implements TeacherT {
    private department: TeacherDepartment;
    private readonly companyType: CompanyType = "School";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height, gender: Gender, department: TeacherDepartment, companyName: string) {
        super(name, age, weight, height, gender, "Teacher");
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.job = "Teacher";
        this.AllhandIsFull = !this.leftHand.IsNull() && !this.rightHand.IsNull();
        this.department = department;
        this.companyName = companyName;
    }

    public get Department(): TeacherDepartment {return this.department;}
    public get CompanyType() : string {return this.companyType;}
    
}

class Manager extends Person implements ManagerT {

    private readonly companyType: CompanyType;

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height, gender: Gender, companyName: string, companyType: CompanyType) {
        super(name, age, weight, height, gender, "Manager");
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.job = "Manager";
        this.companyName = companyName;
        this.companyType = companyType;
    }

    public get CompanyType(): CompanyType {
        return this.companyType;
    }
}

export {
    Person,
    Doctor,
    Engineer,
    Student,
    Teacher,
    Manager
}