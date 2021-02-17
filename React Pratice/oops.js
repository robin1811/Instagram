// super
// constructor
// extends
//  this is defined on runtime, this cannot be changed

class Car{
    // name;
    // mileage;
    // color; 

    constructor(name , mileage , color){
        this.name1 = name;
        // console.log(this.name1)
        this.mileage = mileage;
        this.color = color;
    }
    getDetails(){
        console.log("Inside get details");
        console.log(this);
        console.log(`${this.name1} has ${this.mileage} mileage and color is ${this.color}`);
    }
}


let bmw = new Car("bmw", "9", "white");
console.log(bmw);
console.log();
bmw.getDetails();

let mercedes = new Car("merc", "8", "black");
// console.log(mercedes);
// console.log(this);

console.log("-----------------------");

class Automatic extends Car{
    constructor(name, mileage, color, turbo, automatic){
        super(name, mileage, color);
        this.turbo = turbo;
        this.automatic = automatic;
    }
    getDetails(){
        console.log(this);
    }
}

let automaticCar = new Automatic("bmw", "8", "black","supercharged", "automatic");
automaticCar.getDetails();
