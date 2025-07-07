//Excercises 17:

export class Car {

    //Set the info
    constructor(brand, model) {
        this.brand = brand
        this.model = model
    }

    //Method
    displayInfo(){
        console.log(this.brand)
        console.log(this.model)
    }
}

const toyota = new Car('Toyota', 'Corolla')
const tesla = new Car('Tesla', 'Model 3')


toyota.displayInfo() //Call the method.
tesla.displayInfo()
