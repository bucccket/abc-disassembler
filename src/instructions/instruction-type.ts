export class InstructionType {
    id: any;
    name: any;
    params: any[];

    constructor(instructionData: any[]) {
        this.name = "";
        this.id = "";
        this.params = [];
        for (let i = 0; i < instructionData.length; i++) {
            switch (i) {
                case 0:
                    this.name = instructionData[i];
                    break;
                case 1:
                    this.id = instructionData[i];
                    break;
                default:
                    this.params.push(instructionData[i]);
            }
        }
    }

    toString(): string {
        return `${this.name} ${this.id} ${this.params}`
    }
}