import dontKnow from '../assets/png/dont_know.png';

export class Network {
    private images: HTMLImageElement[] = [];
    private memory: number[][] = [];
    private weights: number[][] = [];
    private deference: number;
    private dontKnowImage = new Image();
    public seemToBe: { [key: number]: number };

    constructor(inputs: number[][], images: HTMLImageElement[] = [], deference = 70) {
        this.saveData(inputs);
        this.deference = deference;
        this.seemToBe = {};
        this.images = images;
        this.dontKnowImage.src = dontKnow;
    }

    public saveData(inputs: number[][]) {
        this.memory = inputs;
        this.weights = inputs[0].map(() => inputs[0].map(() => 0)); // Create N x N null matrix
        inputs.forEach((row, i) => {
            row.forEach((num, iNum) => {
                for (let key = 0; key < row.length; key++) {
                    this.weights[iNum][key] += this.sign(num * row[key]);
                }
            });
        });
        this.weights = this.weights.map((row) => row.map((num) => 1 / this.weights.length * num));

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i][i] = 0;
        }
    }

    public sign(x: number) {
        return x < 0 ? -1 : 1;
    }

    public findAssociation(input: number[]) {
        let res = -1;

        for(let rowIndex = 0; rowIndex < this.memory.length; rowIndex++) {
                let coincidence = 0;
                this.memory[rowIndex].forEach((num, numIndex) => {
                    coincidence += num === input[numIndex] ? 1 : 0;
                });

                if (coincidence === input.length) {
                    res = rowIndex;
                    break;
                } else if (coincidence > (input.length - this.deference)) {
                    this.seemToBe[coincidence] = rowIndex;
                }
        }

        if (Object.keys(this.seemToBe).length > 0) {
            console.log(this.seemToBe);
            res = this.seemToBe[Math.max(...Object.keys(this.seemToBe).map(Number))];
        }

        return res;
    }

    public result(input: number[], attempts = 5) {
        let i = 0;
        while (this.findAssociation(input) < 0 && i < attempts) {
            input = input.map((num, numIndex) => {
                let sum = 0;
                for (let key = 0; key < input.length; key++) {
                    sum += input[key] * this.weights[numIndex][key];
                }
                return this.sign(sum);
            });
            i++;
        }

        return this.findAssociation(input);
    }

    public showResult(resCtx: CanvasRenderingContext2D, imageIndex: number) {
        const image = this.images[imageIndex];
        resCtx.drawImage(image ? image : this.dontKnowImage, 0, 0);
        return imageIndex;
    }
}
