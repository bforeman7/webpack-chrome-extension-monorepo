export class DogModel
{
    private name: string;

    constructor(name: string)
    {
        this.name = name;
    }

    sayName()
    {
        console.log(this.name);
    }
}