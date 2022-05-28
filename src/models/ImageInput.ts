export class ImageInput {
    public images: HTMLImageElement[] = [];
    public pixels: number[][] = [];
    public examplesTraining: number[] = [];
    private imageTraining = new Image();
    private ctx: CanvasRenderingContext2D;
    private canvasHeight: number;
    private canvasWidth: number;

    constructor(images: string[], ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        this.images = images.map(src => {
            const image = new Image();
            image.src = src;
            return image;
        });
        this.ctx = ctx;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth
    }

    public clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public load() {
        this.pixels = this.images.map((image) => {
            this.clearCanvas(this.ctx);
            this.ctx.drawImage(image, 0, 0);
            return this.getPixels(this.ctx);
        });
    }

    public getPixels(ctx: CanvasRenderingContext2D) {
        let data = [];

        for (let x = 0; x < this.canvasWidth; x++) {
            for (let y = 0; y < this.canvasHeight; y++) {
                const rgbPixel = ctx.getImageData(x, y, 1, 1).data.slice(0, 3);
                const isBlack = rgbPixel.reduce((acc, value) => acc + value / 255, 0) >= 1.5;
                data.push(isBlack ? 1 : -1);
            }
        }

        return data;
    }

    public loadTrain(src: string, resCtx: CanvasRenderingContext2D, cb?: () => void) {
        this.imageTraining.onload = () => {
            if (src) {
                this.clearCanvas(resCtx);
            }

            resCtx.drawImage(this.imageTraining, 0, 0);
            this.examplesTraining = this.getPixels(this.ctx);
            if (cb) {
                cb();
            }
        }

        this.imageTraining.src = src;
    }
}
