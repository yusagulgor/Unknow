
// ? For Live Action

// TODO: MEMORYS like logging objects .  And remember type 

import { Person } from "./people";
import {
    Area,
    Get,
    Give,
    GetObj,
    allMem,
    memory,
    Weight,
    BinBrainCells,
    HungPoint,
    ArguBeverage,
    ArguFood,
    fhe,
    fhd,
    Age,
    Gender,
    Jobs,
    PersonT,
    BrainCells,
    bcv,
    hands,
    } from "./types/allTypes";

class Article implements Area{
    protected name?:string;
    protected weight?: Weight; // gr
    protected height?: number; // cm
    protected width?: number;  // cm
    protected lenght?: number; // cm

    constructor(name?:string,weight?:Weight,w?: number, h?: number,l?: number) {
        this.name = name;
        this.weight = weight;
        if (w != null && w < 0 || h != null && h < 0 || l != null && l < 0 ) {
            throw new Error("w , h and l must be greater than zero");
        }
        this.width = w;
        this.height = h;
        this.lenght = l;
    }

    public get Name():string {return this.name!;}
    public get Weight(): number {return this.weight!;}
    public get Height(): number {return this.height!;}
    public get Width(): number {return this.width!;}
    public get Lenght(): number {return this.lenght!;}

    public set Weight(newWeight: Weight) {
        this.weight = newWeight;
    }
    

    public area():number {
        return this.height! * this.lenght! * this.width!;
    }

}

class Space implements GetObj {
    protected isNull: boolean = true;
    protected objs: Article[] = []; 
    protected capacity: number = Infinity; 
    protected fullsCap: number = 0;

    constructor() {}

    public get IsNull(): boolean {
        return this.isNull;
    }

    public getObj(obj: Article): string {
        if (this.IsNull) {
            if (obj.area() < this.capacity) {
                this.objs.push(obj);
                this.fullsCap += obj.area();
                if (this.fullsCap >= this.capacity) {
                    this.isNull = false;
                }
                return `${obj.Name} added`;
            } else {
                return "Alan dolu";
            }
        } else {
            return "Alan boş değil";
        }
    }

    public get getArts(): Article[] {
        return this.objs;
    }
}

abstract class PersonC extends Article implements PersonT{

    protected abstract binbrain:BinBrain;
    protected abstract name: string;
    protected abstract age: Age;
    protected abstract gender: Gender;
    protected abstract job: Jobs;
    protected abstract leftHand: Hand;
    protected abstract rightHand: Hand;
    protected abstract AllhandIsFull: boolean;

    abstract IsHandFull(left:boolean,right:boolean):string|undefined;
    abstract getObject(obj:Article,whand:hands):string;
    abstract giveObject(obj:Article,where:Space|Hand,whand:hands):string;

    abstract eat(food: Food,wHand:hands): string;
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

export class Decoder {
    static retToDecode(data: string | number | boolean, isImmutable: boolean = false): memory[] {
        let binary: string;

        if (typeof data === 'string') {
            binary = Array.from(data)
                .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
                .join('');
        } 
        else if (typeof data === 'number') {
            binary = data.toString(2).padStart(8, '0'); 
        }
        else if (typeof data === 'boolean') {
            binary = data ? '1' : '0';
        } else {
            throw new Error("Unsupported data type");
        }

        if (isImmutable) {
            binary = "1" + binary; 
        }

        const memoryArray: memory[] = binary.split("").map((bit) => parseInt(bit) as memory);
        return memoryArray; 
    }

    static explain(data: memory[], isImmutable: boolean = false): string {
        const binaryString = isImmutable && data[0] === 1 ? data.slice(1).join("") : data.join(""); 

        if (binaryString.length % 8 === 0) {
            let textOutput = '';
            for (let i = 0; i < binaryString.length; i += 8) {
                const byte = binaryString.slice(i, i + 8);
                const charCode = parseInt(byte, 2);
                if (charCode >= 32 && charCode <= 126) {
                    textOutput += String.fromCharCode(charCode);
                }
            }
            if (textOutput) {
                return textOutput;
            }
        }

        const decimalValue = parseInt(binaryString, 2);
        return decimalValue.toString();
    }
}

export class BinBrain {
    private memorys: BinBrainCells;

    constructor() {
        this.memorys = {};
    }

    public add(key: string, val: allMem): string {
        
        if(key in this.memorys) {
            return "memory already exists";
        }else {
            this.memorys[key] = val;
            return "memory added";
        }
    }

    public get MemoryValues(): BinBrainCells {
        return this.memorys;
    }

    public get Keys(): string {
        return Object.keys(this.memorys).join(", ");
    }

    public get BcLength(): number {
        return Object.keys(this.memorys).length;
    }

    public IndexOfVal(index: number): allMem {
        const keys = Object.keys(this.memorys);
        index = index - 1;
        if (index < 0 || index >= keys.length) {
            throw new Error("Index out of bounds. The index cannot be bigger than the memory length.");
        }
        const key = keys[index];
        return this.memorys[key];
    }

    public IndexOfKey(index: number): string {
        const keys = Object.keys(this.memorys);
        index = index - 1;
        if (index < 0 || index >= keys.length) {
            throw new Error("Index out of bounds. The index cannot be bigger than the memory length.");
        }
        return keys[index];
    }

    public updateIndexOfValue(index: number, newVal: memory | memory[]): string {
        const keys = Object.keys(this.memorys);
        index = index - 1;

        if (index < 0 || index >= keys.length) {
            throw new Error("Index out of bounds. The index cannot be bigger than the memory length.");
        }

        const key = keys[index];

        if (JSON.stringify(this.memorys[key]) === JSON.stringify(newVal)) {
            return "newVal is the same as oldVal";
        }

        if (this.memorys[key].valueOf() === 1) {
            return "this value cannot be changed";
        }

        if (Array.isArray(this.memorys[key])) {
            const memoryArray = this.memorys[key] as memory[];
            if (memoryArray[0] === 1) {
                return "this array value cannot be changed";
            }
        }

        this.memorys[key] = newVal;
        return "value is updated";
    }

    public updateNameOfValue(name: string, newVal: memory | memory[]): string {
        if (!(name in this.memorys)) {
            return "name is undefined";
        }

        if (JSON.stringify(this.memorys[name]) === JSON.stringify(newVal)) {
            return "newVal is the same as oldVal";
        }

        this.memorys[name] = newVal;
        return "value is updated";
    }
}

export class Brain {
    private memorys: BrainCells;

    constructor() {
        this.memorys = {};
    }

    public addMemory(key: string, value: bcv): string {
        if (this.memorys[key]) {
            return `Memory for key "${key}" already exists`;
        }
        this.memorys[key] = value;
        return `Memory for key "${key}" added`;
    }

    public getMemory(key: string): bcv | undefined {
        return this.memorys[key];
    }

    public get allMemories(): BrainCells {
        return this.memorys;
    }

    public get allKeys(): string[] {
        return Object.keys(this.memorys);
    }

    public get memoryCount(): number {
        return Object.keys(this.memorys).length;
    }

    public updateMemoryByKey(key: string, newVal: bcv): string {
        if (!(key in this.memorys)) {
            return `No memory found for key "${key}"`;
        }

        if (JSON.stringify(this.memorys[key]) === JSON.stringify(newVal)) {
            return "New value is the same as the old value";
        }

        this.memorys[key] = newVal;
        return `Memory for key "${key}" updated`;
    }

    public updateMemoryByIndex(index: number, newVal: bcv): string {
        const keys = Object.keys(this.memorys);
        
        if (index < 0 || index >= keys.length) {
            throw new Error("Index out of bounds. The index cannot be bigger than the memory length.");
        }

        const key = keys[index];

        if (JSON.stringify(this.memorys[key]) === JSON.stringify(newVal)) {
            return "New value is the same as the old value";
        }

        this.memorys[key] = newVal;
        return `Memory for key "${key}" updated`;
    }

    public deleteMemory(key: string): string {
        if (!(key in this.memorys)) {
            return `No memory found for key "${key}"`;
        }
        delete this.memorys[key];
        return `Memory for key "${key}" deleted`;
    }
}



class Food extends Article {
    protected neliefPoint: HungPoint;
    protected argums: ArguFood;

    constructor(name: string, weight: Weight, neliefPoint: HungPoint, argum: ArguFood) {
        super(name, weight); 
        this.neliefPoint = neliefPoint;
        this.argums = argum;
    }  
    
    public get NeliefPoint(): number {   
        return this.neliefPoint;
    }

    public forWhoEat(who: fhe): boolean { 
        if (this.argums.forWhoEatable && this.argums.forWhoEatable[who] === true) {
            return true;
        } else {
            return false;
        }
    }
}


class Beverage extends Article {
    protected neliefPoint: HungPoint;
    protected argums: ArguBeverage;

    constructor(name: string, argu: ArguBeverage, neliefPoint: HungPoint) {
        super(name);
        this.neliefPoint = neliefPoint;
        this.argums = argu;
    }

    public get NeliefPoint(): number {
        return this.neliefPoint;
    }

    public forWhoDrink(who: fhd): boolean { 
        if (this.argums.forWhoDrinkable && this.argums.forWhoDrinkable[who] === true) {
            return true;
        } else {
            return false;
        }
    }
}

class Foots{
    private strong:number ;

    constructor(strong:number){
        this.strong = strong;
    }

}

// TODO : Ya sıra ekliceksin ya da başka bişi.

class Hand implements Get, Give {
    private name:string;
    private strong: number;
    private isNull: boolean;
    private _inTheObject: Article  | null;

    constructor(name:string,strong: number) {
        this.name = name
        this.strong = strong;
        this.isNull = true;
        this._inTheObject = null;
    }

    
    public get Name() : string {
        return this.name;
    }

    // public eat(food:Food):string{}

    public get(obj: Article,IsTHO:boolean=false): string {
        if (this.isNull == true) {
            if(IsTHO){
                if(obj.Height == undefined && obj.Lenght == undefined && obj.Width == undefined){
                    if(obj.Weight > this.Strong*2){
                        return `bu ${obj.Name} objesini taşıyamazsın`
                    }else{
                        this.isNull = false;
                        this._inTheObject = obj;
                        return `${obj.Name} objesi ellerinde `
                    }
                }else{
                    if(obj.Height > 200 && obj.Lenght > 50 && obj.Width > 50 && obj.Weight > this.strong*2){
                        return `iki elle bile ${obj.Name} taşıyamazsın`
                    }else{
                        this.isNull = false;
                        this._inTheObject = obj;
                        return `${obj.Name} objesi ellerinde `
                    }
                }
            }else{
                if(obj.Height == undefined && obj.Lenght == undefined && obj.Width == undefined){
                    if(obj.Weight > this.Strong){
                        return `bu ${obj.Name} objesini taşıyamazsın`
                    }else{
                        this.isNull = false;
                        this._inTheObject = obj;
                        return `bu ${obj.Name} objesini aldın.`
                    }
                }else{
                    if(obj.Weight < this.strong && obj.Height < 180) { // matematik lazım mesela : height * weight
                        this.isNull = false;
                        this._inTheObject = obj;
                        return `bu ${obj.Name} objesini aldın.`
                    }
                    else {
                        return `bu ${obj.Name} objesini taşıyamazsın`
                    }
                }
            }
        } else {
            return "elin dolu";
        }
    }
        

    public give(obj: Article, _where: Space | Hand): string {
        if (!this.isNull) {
            if (_where.IsNull) {
                if (_where instanceof Space) {
                    return _where.getObj(obj);
                } else if (_where instanceof Hand) {
                    return "from karşı el:" +_where.get(obj,false);
                }else{
                    return "where type is not Space or Hand";
                }
            } else {
                this.isNull = false;
                return `${obj.Name} yere düştü.`;
            }
        } else {
            return "Elinde bir şey yok.";
        }
    }
    
    public get inTheObject() : Article|null {
        return this._inTheObject;
    }
    

    public get Strong(): number {
        return this.strong;
    }

    public IsNull(): boolean {
        return this.isNull;
    }

}

class Family {
    private father: Person | null;
    private mother: Person | null;
    private children: Person[];

    constructor(father: Person | null = null, mother: Person | null = null, children: Person[] = []) {
        if (father && father.Gender !== "male") {
            throw new Error("Babanın cinsiyeti 'male' olmalıdır.");
        }
        if (mother && mother.Gender !== "female") {
            throw new Error("Annenin cinsiyeti 'female' olmalıdır.");
        }

        this.father = father;
        this.mother = mother;
        this.children = children;
    }

    public addFather(father: Person): void {
        if (father.Gender !== "male") {
            throw new Error("Babanın cinsiyeti 'male' olmalıdır.");
        }

        if (this.father == null) {
            this.father = father;
        } else {
            console.log("Baba zaten var!");
        }
    }

    public addMother(mother: Person): void {
        if (mother.Gender !== "female") {
            throw new Error("Annenin cinsiyeti 'female' olmalıdır.");
        }

        if (this.mother == null) {
            this.mother = mother;
        } else {
            console.log("Anne zaten var!");
        }
    }

    public addChild(child: Person): void {
        this.children.push(child);
    }

    public removeChild(child: Person): void {
        this.children = this.children.filter(c => c !== child);
    }

    public getFamilyInfo(): string {
        let info = "Aile Bilgileri:\n";
        info += this.father ? `Baba: ${this.father.Info()}\n` : "Baba yok.\n";
        info += this.mother ? `Anne: ${this.mother.Info()}\n` : "Anne yok.\n";
        info += this.children.length > 0 ? `Çocuklar:\n${this.children.map(c => c.Info()).join("\n")}` : "Çocuk yok.\n";
        return info;
    }
}

export{
    Article,
    Space,
    Food,
    Beverage,
    Hand,
    PersonC,
    Family
}
