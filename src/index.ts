class GetName {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

let a: any = new GetName("ding");

console.log(a.getName());
