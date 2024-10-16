

import { 
    DoctorT,
    EngineerT,
    StudentT,
    TeacherT,
    ManagerT,
    Weight,
    Height,
    BinBrainCells,
    PeopleWeight,
    // HungPoint
    Age,
    Gender,
    Jobs,
    DocBranchs,
    CompanyType,
    TeacherDepartment,
    SchoolType,
    EngineerDepartment,
    Strength,
    hands
 } from './types/allTypes';

import { Hand,Article, BinBrain, Space, Decoder, Food, Beverage , PersonC, Brain } from './fal';

const space = new Space();

class Person extends PersonC {

    protected name: string;
    protected age: Age;
    protected leftHand: Hand;
    protected rightHand: Hand;
    protected gender: Gender;
    protected job: Jobs;
    protected binbrain: BinBrain;
    // protected brain : Brain;
    protected companyName: string|undefined = "";

    protected AllhandIsFull: boolean;

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, job: Jobs,companyName?:string) {
        super(name, weight, 10, height, 6);
        this.name = name;
        this.age = age;
        this.job = job;
        this.gender = gender;
        if (this.gender == "female") {
            this.leftHand = new Hand("left", handStrength-10);
            this.rightHand = new Hand("right", handStrength-10);
        } else {
            this.leftHand = new Hand("left", handStrength);
            this.rightHand = new Hand("right", handStrength);
        }

        if(this.job != null && this.companyName != undefined ){
            this.companyName = companyName
        }else{
            throw new Error("Eğer jobun varsa işyeri adı olması lazım.");
        }

        this.AllhandIsFull = !this.leftHand.IsNull() && !this.rightHand.IsNull();
        this.binbrain = new BinBrain();
        this.BinInitMemory();
    }

    private BinInitMemory(): void {
        let dname = Decoder.retToDecode(this.name);
        let dage = Decoder.retToDecode(this.age);
        let dweight = Decoder.retToDecode(this.weight!);
        let dgender = Decoder.retToDecode(this.gender, true);
        let dheight = Decoder.retToDecode(this.height!, true);
        let djob = Decoder.retToDecode(this.job!);

        this.binbrain.add("Name", dname);
        this.binbrain.add("Age", dage);
        this.binbrain.add("Weight", dweight);
        this.binbrain.add("Gender", dgender);
        this.binbrain.add("Height", dheight);
        this.binbrain.add("Job", djob);
        this.binbrain.add("leftHand", 0);
        this.binbrain.add("rightHand", 0);
    }

    private initMemory(): void {
        
    }

    
    public get Gender() : string {
        return this.gender; 
    }
    

    // public get LeftHand(): Hand {
    //     return this.leftHand;
    // }

    // public get RightHand(): Hand {
    //     return this.rightHand;
    // }

    public get BrainValues(): BinBrainCells {
        return this.binbrain.MemoryValues;
    }

    public set Weight(newWeight: Weight) {
        let decodedWeight = Decoder.retToDecode(newWeight);
        const updateStatus = this.binbrain.updateNameOfValue("Weight", decodedWeight);
        if (updateStatus === "value is updated") {
            this.weight = newWeight;
        } else {
            throw new Error(updateStatus);
        }
    }

    public set Age(newAge: Age) {
        let decodedAge = Decoder.retToDecode(newAge);
        const updateStatus = this.binbrain.updateNameOfValue("Age", decodedAge);
        if (updateStatus === "value is updated") {
            this.age = newAge;
        } else {
            throw new Error(updateStatus);
        }
    }

    public get Job(): Jobs {
        return this.job;
    }

    public set Job(newJob: Jobs) {
        let cek = newJob == null ? 0: newJob;
        let decodedCompanyName = Decoder.retToDecode(cek);
        const updateStatus = this.binbrain.updateNameOfValue("CompanyName", decodedCompanyName);
        if (updateStatus === "value is updated") {
            this.job = newJob;
        } else {
            throw new Error(updateStatus);
        }
    }

    public get CompanyName(): string|undefined{
        return this.companyName;
    }

    public set CompanyName(newCompanyName: string) {
        let decodedCompanyName = Decoder.retToDecode(newCompanyName);
        const updateStatus = this.binbrain.updateNameOfValue("CompanyName", decodedCompanyName);
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

    public whatITheHand(left: boolean = false, right: boolean = false): string {
        if (!right && !left) {
            return this.AllhandIsFull ? "All hands are full" : "not: all hands are not full";
        }
        if (left) {
            return this.leftHand.IsNull() ? "Left hand is empty" : this.leftHand.inTheObject?.Name +" in the left Hand";
        }
        if (right) {
            return this.rightHand.IsNull() ? "Right hand is empty" : this.rightHand.inTheObject?.Name +" in the right Hand";
        }
        return "Invalid hand selection";
    }

    private setHand(hand:hands){
        let Hand:Hand|undefined = undefined
        if(hand == "right"){
            Hand = this.rightHand;
            return Hand
        }else if(hand == "left"){
            Hand = this.leftHand
            return Hand 
        }else{
            return "all"
        }
    }

    private getWithBothHands(object: Article): string {
        const leftResult = this.leftHand.get(object, true);
        const rightResult = this.rightHand.get(object, true);
        
        if (leftResult === rightResult) {
            this.binbrain.updateNameOfValue("leftHand", Decoder.retToDecode(object.Name));
            this.binbrain.updateNameOfValue("rightHand", Decoder.retToDecode(object.Name));
            this.AllhandIsFull = true;
            return leftResult;
        } else {
            return rightResult;
        }
    }

    public getObject(object: Article, hand:hands): string {
        let cek = this.setHand(hand);
        if(cek == "all"){
            return this.getWithBothHands(object)
        }else if(cek instanceof Hand){
            const result = cek.get(object);
        
            if (result === `bu ${object.Name} objesini taşıyamazsın`) {
                return `bu ${object.Name} objesini taşıyamazsın`; 
            } else {
                let decodedObject = Decoder.retToDecode(object.Name);
                this.binbrain.updateNameOfValue(cek.Name + "Hand", decodedObject);
                this.AllhandIsFull = !this.leftHand.IsNull() && !this.rightHand.IsNull();
                return result;
            }
        }else{
            return "unknown error in the get func"
        }
        
    }

    private giveWithBothHands(object: Article,where:Space|Hand): string {
        const leftResult = this.leftHand.give(object,where);
        const rightResult = this.rightHand.give(object,where);

        if (leftResult === rightResult) {
            this.binbrain.updateNameOfValue("leftHand", Decoder.retToDecode("boş"));
            this.binbrain.updateNameOfValue("rightHand", Decoder.retToDecode("boş"));
            this.AllhandIsFull = false;
            return leftResult;
        } else {
            return rightResult;
        }

    }

    public giveObject(object: Article, where: Space | Hand, hand:hands): string {
        let cek= this.setHand(hand);
        if(cek == "all"){
            return this.giveWithBothHands(object,where)
        }else if(cek instanceof Hand){
            const result = cek.give(object, where);
            if (result === `${object.Name} added` || result === `bu ${object.Name} objesini aldın.`) {
                cek.give(object, where);
                this.binbrain.updateNameOfValue("rightHand", Decoder.retToDecode("boş"));
                return result;
            }
            return result;
        }else{
            return "unknown error in the give func"
        }
    }     
    

    public eat(food: Food, whand: "right"|"left"): string {
        let cek = this.setHand(whand);
        if(cek instanceof Hand){
            if (food.forWhoEat("human") && food == cek.inTheObject && !cek.IsNull()){
                cek.give(food,space)
                return food.Name + " eated";
            }else{
                if (food != cek.inTheObject) {
                    return "yemek elin içinde değil";
                } else if (!food.forWhoEat("human")) {
                    return "insanlar için yenilebilir değil.";
                } else {
                    return "unknown hata, yiyemedin.";
                }
            }
        }else{
            return "unknown error in the eat func"
        }
    }

    public drink(beverage: Beverage): string {
        return "not yet";
    }

    public override area(): number {
        return this.width! * this.height! * this.lenght!;
    }

    public Info(): string {
        return `Name: ${this.name}, Age: ${this.age}, Job: ${this.job}, Gender: ${this.gender}`;
    }
}

class Doctor extends Person implements DoctorT {
    private branch: DocBranchs;
    private readonly companyType: CompanyType = "Hospital";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, branch: DocBranchs, companyName: string) {
        super(name, age, weight, height,handStrength,gender, "Doctor");
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

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, companyName: string, department: EngineerDepartment) {
        super(name, age, weight, height, handStrength,gender, "Engineer");
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

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender) {
        super(name, age, weight, height,handStrength,gender, "Student");
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

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength ,gender: Gender, department: TeacherDepartment, companyName: string) {
        super(name, age, weight, height,handStrength,gender, "Teacher");
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

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, companyName: string, companyType: CompanyType) {
        super(name, age, weight, height, handStrength,gender, "Manager");
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