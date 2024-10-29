// Hand sınıfı: Sağ ve sol el için temel bir sınıf
class Hand {
    private item: string | null = null; // Elin içindeki eşya, başlangıçta boş

    // Eşyayı ele eklemek için setter
    public set Item(newItem: string) {
        this.item = newItem;
    }

    // Elin içindeki eşyayı almak için getter
    public get Item(): string | null {
        return this.item;
    }

    // Elin boş olup olmadığını kontrol etmek için bir işlev
    public IsNull(): boolean {
        return this.item === null;
    }
}

// Person sınıfı: Sağ ve sol el özellikleri ile donatılmış temel bir sınıf
class Person {
    private leftHand: Hand = new Hand();   // Sol el
    private rightHand: Hand = new Hand();  // Sağ el

    // Sol el için getter ve setter
    public get LeftHand(): Hand {
        return this.leftHand;
    }

    public set LeftHandItem(item: string) {
        this.leftHand.Item = item;
    }

    // Sağ el için getter ve setter
    public get RightHand(): Hand {
        return this.rightHand;
    }

    public set RightHandItem(item: string) {
        this.rightHand.Item = item;
    }

    // Eller dolu mu kontrol eden işlev
    public get AreBothHandsFull(): boolean {
        return !this.leftHand.IsNull() && !this.rightHand.IsNull();
    }
}

// Test aşaması
const person = new Person();

// İlk durum: Eller boş
console.log("Başlangıç durumu:");
console.log("Sol el boş mu?", person.LeftHand.IsNull());
console.log("Sağ el boş mu?", person.RightHand.IsNull());
console.log("Her iki el dolu mu?", person.AreBothHandsFull);

// Sol ele eşya ekleyelim
person.LeftHandItem = "Kitap";
console.log("\nSol ele eşya eklendi:");
console.log("Sol el boş mu?", person.LeftHand.IsNull());
console.log("Sağ el boş mu?", person.RightHand.IsNull());
console.log("Her iki el dolu mu?", person.AreBothHandsFull);

// Sağ ele eşya ekleyelim
person.RightHandItem = "Kalem";
console.log("\nSağ ele eşya eklendi:");
console.log("Sol el boş mu?", person.LeftHand.IsNull());
console.log("Sağ el boş mu?", person.RightHand.IsNull());
console.log("Her iki el dolu mu?", person.AreBothHandsFull);
