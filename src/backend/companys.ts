import { CompanyT, HospitalT, SchoolT, SmallBusinessEx, SmallBusinessT, TechnologyT } from "./types/allTypes";
import { Doctor, Engineer, Manager, Person, Student, Teacher } from "./people";

// ? Companys classes
abstract class CompanyC implements CompanyT {
    protected abstract name: string;
    protected abstract workers: Person[];
    protected abstract manager: Manager;

    public abstract addNewWorkers(newWorkers: Person | Person[]): string;
}

class Company extends CompanyC {
    protected name: string;
    protected workers: Person[];
    protected manager: Manager;

    constructor(name: string, manager: Manager) {
        super();
        this.name = name;
        if (manager.CompanyType !== this.constructor.name) {
            throw new Error("Company type must be manager bla bla");
        }
        this.manager = manager;
        this.workers = [];
    }

    public get Name(): string {
        return this.name;
    }

    public get Workers(): Person[] {
        return this.workers;
    }

    public set Name(newName: string) {
        this.name = newName;
    }

    public get Manager(): Manager {
        return this.manager;
    }

    public set Manager(newManager: Manager) {
        this.manager = newManager;
    }

    public addNewWorkers(newWorkers: Person | Person[]): string {
        if (newWorkers instanceof Person) {
            this.workers.push(newWorkers);
            return newWorkers.Job+" eklendi";
        } else if (Array.isArray(newWorkers)) {
            this.workers = this.workers.concat(newWorkers);
            return "Workers eklendi";
        } else {
            return "Yanlış type";
        }
    }
}

class Hospital extends Company implements HospitalT {
    constructor(name: string, manager: Manager) {
        super(name, manager);
    }

    public addNewDoctor(newDoctor: Person | Person[]): string {
        return this.addNewWorkers(newDoctor);
    }
}

class School extends Company implements SchoolT {
    private teachers: Teacher[];
    private students: Student[];

    constructor(name: string, manager: Manager) {
        super(name, manager);
        this.teachers = [];
        this.students = [];
    }

    public get TeachersList(): Teacher[] {
        return this.teachers;
    }

    public get StudentsList(): Student[] {
        return this.students;
    }

    public addNewTeachers(newTeacher: Teacher | Teacher[]): string {
        if (newTeacher instanceof Teacher) {
            this.teachers.push(newTeacher);
            return "Öğretmen eklendi";
        } else if (Array.isArray(newTeacher)) {
            this.teachers = this.teachers.concat(newTeacher);
            return "Öğretmenler eklendi";
        } else {
            return "Yanlış type";
        }
    }

    public addNewStudents(newStudent: Student | Student[]): string {
        if (newStudent instanceof Student) {
            this.students.push(newStudent);
            return "Öğrenci eklendi";
        } else if (Array.isArray(newStudent)) {
            this.students = this.students.concat(newStudent);
            return "Öğrenciler eklendi";
        } else {
            return "Yanlış type";
        }
    }
}

class Technology extends Company implements TechnologyT {
    constructor(name: string, manager: Manager) {
        super(name, manager);
    }

    public addNewEngineers(newWorkers: Engineer | Engineer[]): string {
        return this.addNewWorkers(newWorkers);
    }
}

class SmallBusiness extends Company implements SmallBusinessT {
    private type: SmallBusinessEx;

    constructor(name: string, manager: Manager, type: SmallBusinessEx) {
        super(name, manager);
        this.type = type;
    }

    public get Type(): SmallBusinessEx {
        return this.type;
    }

    public set Type(newType: SmallBusinessEx) {
        this.type = newType;
    }
}


export{
    Company,
    Hospital,
    School,
    Technology,
    SmallBusiness,
}