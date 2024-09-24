
// ? For Live Action

// TODO: MEMORYS like logging objects .  And remember type 

import {
    Area,
    Get,
    Give,
    GetObj,
    allMem,
    memory,
    Weight,
    BrainCells,
    HungPoint,
    ArguBeverage,
    ArguFood,
    fhe,
    fhd,
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
    protected objs: Article[] = []; // objs özelliği burada başlatıldı.
    protected capacity: number = Infinity; // inf yerine Infinity kullanıyoruz.
    protected fullsCap: number = 0;

    constructor() {}

    public get IsNull(): boolean {
        return this.isNull;
    }

    public getObj(obj: Article): string {
        if (this.IsNull) {
            if (obj.area() < this.capacity) {
                this.objs.push(obj); // objs başlatıldığı için artık push edilebilir.
                this.fullsCap += obj.area();
                if (this.fullsCap >= this.capacity) {
                    this.isNull = false;
                }
                return `${obj} added`;
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
            binary = "1" + binary; // Immutable ise başına '1' ekle
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

export class Brain {
    private memorys: BrainCells;

    constructor() {
        this.memorys = {};
    }

    public add(key: string, val: allMem): string {
        this.memorys[key] = val;
        return "memory added";
    }

    public get MemoryValues(): BrainCells {
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
    

    public get(obj: Article,IsTHO:boolean=false): string {
        if (this.isNull == true) {
            if(IsTHO){
                if(obj.Height > 200 && obj.Lenght > 50 && obj.Width > 50 && obj.Weight > this.strong){
                    return `iki elle bile ${obj} taşıyamazsın`
                }else{
                    this.isNull = false;
                    this._inTheObject = obj;
                    return `${obj} objesi ellerinde `
                }
            }else{
                if(obj.Weight < this.Strong && obj.Height < 180) { // matematik lazım mesela : height * weight
                    this.isNull = false;
                    this._inTheObject = obj;
                    return `bu ${obj} objesini aldın.`
                }
                else {
                    return `bu ${obj} objesini taşıyamazsın`
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
                return `${obj} yere düştü.`;
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

export{
    Article,
    Space,
    Food,
    Beverage,
    Hand,
}
