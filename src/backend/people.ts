

import { 
    DoctorT,
    EngineerT,
    StudentT,
    TeacherT,
    ManagerT,
    Weight,
    Height,
    PeopleWeight,
    Age,
    Gender,
    Jobs,
    DocBranchs,
    CompanyType,
    TeacherDepartment,
    SchoolType,
    EngineerDepartment,
    Strength,
    hands,
    OneLineCheck
 } from './types/allTypes';

import { Hand,Article, Space, Food , PersonC, Stomach } from './fal';

class Person extends PersonC {
    protected isDead: boolean = false;
    protected name: string;
    protected age: Age;
    protected leftHand: Hand;
    protected rightHand: Hand;
    protected gender: Gender;
    protected job: Jobs;
    // protected binbrain: BinBrain ;
    protected companyName: string | undefined;
    protected stomach: Stomach ;


    constructor(
        name: string,
        age: Age,
        weight: PeopleWeight,
        height: Height,
        handStrength: Strength,
        gender: Gender,
        job: Jobs = null,
        CompanyName: string | undefined = undefined
    ) {
        super(3,name, weight, 10, height, 6);
        this.name = name;
        this.age = age;
        this.job = job;
        this.gender = gender;

        if (this.gender == "female") {
            this.leftHand = new Hand("left", handStrength - 10);
            this.rightHand = new Hand("right", handStrength - 10);
        } else {
            this.leftHand = new Hand("left", handStrength);
            this.rightHand = new Hand("right", handStrength);
        }

        if (job == null && CompanyName == null) {
        } else {
            if (job != null && CompanyName == null) {
                throw new Error("İşin varsa şirket ismi olmalı");
            } else if (job == null && CompanyName != null) {
                throw new Error("Hangi pozisyonda çalıştığını constructor'da belirt");
            } else {
                this.job = job;
                this.companyName = CompanyName;
            }
        }
        this.stomach = new Stomach();
        // this.binbrain = new BinBrain();
    }

    // private BinInitMemory(): void {
    //     let dname = Decoder.retToDecode(this.name);
    //     let dage = Decoder.retToDecode(this.age);
    //     let dweight = Decoder.retToDecode(this.weight!);
    //     let dgender = Decoder.retToDecode(this.gender, true);
    //     let dheight = Decoder.retToDecode(this.height!, true);
    //     let djob = Decoder.retToDecode(this.job!);

    //     this.binbrain.add("Name", dname);
    //     this.binbrain.add("Age", dage);
    //     this.binbrain.add("Weight", dweight);
    //     this.binbrain.add("Gender", dgender);
    //     this.binbrain.add("Height", dheight);
    //     this.binbrain.add("Job", djob);
    //     this.binbrain.add("leftHand", 0);
    //     this.binbrain.add("rightHand", 0);
    // }

    private initMemory(): void {
        
    }
    
    public get Gender() : string {
        return this.gender; 
    }
    
    // ? For testing 

    // public nulluk(left:boolean,right:boolean):any{
    //     if(left){return this.leftHand.IsNull()}
    //     if(right){return this.rightHand.IsNull()}
    //     else {return "sa ";};
    // }

    // public get LeftHand(): Hand {
    //     return this.leftHand;
    // }

    // public get RightHand(): Hand {
    //     return this.rightHand;
    // }

    // public get BrainValues(): BinBrainCells {
    //     return this.binbrain.MemoryValues;
    // }

    public set Weight(newWeight: Weight) {
        this.weight = newWeight;
    }

    public set Age(newAge: Age) {
        this.age = newAge;
    }

    public get Job(): Jobs {
        return this.job;
    }

    public set Job(newJob: Jobs) {
        this.job = newJob;
        // let cek = newJob == null ? 0: newJob;
        // let decodedCompanyName = Decoder.retToDecode(cek);
        // const updateStatus = this.binbrain.updateNameOfValue("CompanyName", decodedCompanyName);
        // if (updateStatus === "value is updated") {
        //     this.job = newJob;
        // } else {
        //     throw new Error(updateStatus);
        // }
    }

    public get CompanyName(): string|undefined{
        return this.companyName;
    }

    public set CompanyName(newCompanyName: string) {
        this.companyName = newCompanyName;
        // let decodedCompanyName = Decoder.retToDecode(newCompanyName);
        // const updateStatus = this.binbrain.updateNameOfValue("CompanyName", decodedCompanyName);
        // if (updateStatus === "value is updated") {
        //     this.companyName = newCompanyName;
        // } else {
        //     throw new Error(updateStatus);
        // }
    }

    public get AreBothHandsFull(): boolean {
        return !this.leftHand.IsNull() && !this.rightHand.IsNull();
    }
    

    public IsHandFull(left: boolean = false, right: boolean = false): string {
        if (left && right) {
            return this.AreBothHandsFull ? "All hands are full" : "Not all hands are full";
        }
        if (left) {
            return this.leftHand.IsNull() ? "Left hand is empty" : "Left hand is not empty";
        }
        if (right) {
            return this.rightHand.IsNull() ? "Right hand is empty" : "Right hand is not empty";
        }
        return "Invalid hand selection / ikisi de false olamaz";
    }

    public whatITheHand(left: boolean = false, right: boolean = false): string {
        if (!right && !left) {
            return this.AreBothHandsFull ? "All hands are full" : "not: all hands are not full";
        }
        if (left) {
            return this.leftHand.IsNull() ? "Left hand is empty" : Array.isArray(this.leftHand.inTheObject)?"elinde birden çok eşya var": this.leftHand.inTheObject?.Name +" in the left Hand";
        }
        if (right) {
            return this.rightHand.IsNull() ? "Right hand is empty" : Array.isArray(this.rightHand.inTheObject)?"elinde birden çok eşya var": this.rightHand.inTheObject?.Name +" in the right Hand";
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
            return leftResult;
        } else {
            return rightResult;
        }
    }

    public getObject(object: Article, hand:hands): string {
        let selectedHand = this.setHand(hand);
        if(selectedHand == "all"){
            return this.getWithBothHands(object)
        }else if(selectedHand instanceof Hand){
            const result = selectedHand.get(object);
            if (result === `bu ${object.Name} objesini taşıyamazsın`) {
                return `bu ${object.Name} objesini taşıyamazsın`; 
            } else {
                return result ;
            }
        }else{
            return "unknown error in the get func"
        }
        
    }

    private giveWithBothHands(object: Article,where:Space|Person): string {
        const leftResult = this.leftHand.give(object,where);
        const rightResult = this.rightHand.give(object,where);

        if (leftResult === rightResult) {
            return leftResult;
        } else {
            return rightResult;
        }

    }

    public giveObject(object: Article, where: Space | Person, hand:hands): string {
        if (this.leftHand.inTheObject == this.rightHand.inTheObject){
            console.log("objeyi tek elle taşıyamayacağın için iki elinden birden düştü.");
            return this.giveWithBothHands(object,where);
        }
        let cek= this.setHand(hand);
        if(cek == "all"){
            return this.giveWithBothHands(object,where)
        }else if(cek instanceof Hand){
            const result = cek.give(object, where);
            return result;
        }else{
            return "unknown error in the give func"
        }
    }
    
    public smashTObj(object: Article,smashType:"Horizontal"|"Vertical",howMuch:number,hand:"left"|"right"):string{
        let usHand=this.setHand(hand);
        let useHand = usHand as Hand;
        return useHand.smash(object,smashType,howMuch);
    }
    
    public eat(food: Food, whand: "right"|"left"): string {
        let cek = this.setHand(whand);
        if(cek instanceof Hand){
            if (food.forWhoEat("human") && food == cek.inTheObject && !cek.IsNull()){
                return cek.give(food,this.stomach);
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

    // public drink(beverage: Beverage): string {
    //     return "not yet";
    // }

    public override area(): number {
        return this.width! * this.height! * this.lenght!;
    }

    public Info(): string {
        let cek = this.job==null ? "yok" : this.job; 
        return `Name: ${this.name}, Age: ${this.age}, Job: ${cek}, Gender: ${this.gender} ,Hands is are full: ${this.AreBothHandsFull}`;
    }
}

class Doctor extends Person implements DoctorT {
    protected isDead: boolean = false;
    private branch: DocBranchs;
    private readonly companyType: CompanyType = "Hospital";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, branch: DocBranchs, companyName: string) {
        super(name, age, weight, height,handStrength,gender, "Doctor",companyName);
        this.job = "Doctor";
        this.branch = branch;
    }

    public get Branch(): DocBranchs { return this.branch; }
    public get CompanyType(): CompanyType { return this.companyType; }
    
    public set Branch(newBranch : DocBranchs) {
        this.branch = newBranch;
    }
    
}

class Engineer extends Person implements EngineerT {
    protected isDead: boolean = false;

    private department: EngineerDepartment;
    private readonly companyType: CompanyType = "Technology";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, companyName: string, department: EngineerDepartment) {
        super(name, age, weight, height, handStrength,gender, "Engineer",companyName);
        this.job = "Engineer";
        this.department = department;
    }

    public get Department(): EngineerDepartment {return this.department;}
    public get CompanyType(): CompanyType {return this.companyType;}

    public set Department(newDepartment : EngineerDepartment) {
        this.department = newDepartment;
    }

    
}

class Student extends Person implements StudentT {
    // protected isDead: boolean = false;
    // // private schoolName: string;
    // // private degree: Degree;
    // // private type: SchoolType;

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
    protected isDead: boolean = false;
    private department: TeacherDepartment;
    private readonly companyType: CompanyType = "School";

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength ,gender: Gender, department: TeacherDepartment, companyName: string) {
        super(name, age, weight, height,handStrength,gender, "Teacher",companyName);
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.job = "Teacher";
        this.department = department;
    }

    public get Department(): TeacherDepartment {return this.department;}
    public get CompanyType() : string {return this.companyType;}
    
}

class Manager extends Person implements ManagerT {
    protected isDead: boolean = false;

    private readonly companyType: CompanyType;

    constructor(name: string, age: Age, weight: PeopleWeight, height: Height,handStrength:Strength,gender: Gender, companyName: string, companyType: CompanyType) {
        super(name, age, weight, height, handStrength,gender, "Manager",companyName);
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.job = "Manager";
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