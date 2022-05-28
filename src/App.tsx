import React, { useEffect, useRef, useState } from 'react';
import * as ST from './styled';
import { Button, Canvas } from './components';
import { ImageInput, Network } from './models';
import img1 from './assets/png/letters_hands/1.png';
import img2 from './assets/png/letters_hands/2.png';
import img3 from './assets/png/letters_hands/3.png';
import img4 from './assets/png/letters_hands/4.png';
import img5 from './assets/png/letters_hands/5.png';
import img6 from './assets/png/letters_hands/6.png';
import img7 from './assets/png/letters_hands/7.png';
import img8 from './assets/png/letters_hands/8.png';
import img9 from './assets/png/letters_hands/9.png';
import img10 from './assets/png/letters_hands/10.png';
import img11 from './assets/png/letters_hands/11.png';
import img12 from './assets/png/letters_hands/12.png';
import img13 from './assets/png/letters_hands/13.png';

const CANVAS_WIDTH = 32;
const CANVAS_HEIGHT = 32;

const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
];

function App() {
    const imageInputRef = useRef<ImageInput>();
    const networkRef = useRef<Network>();
    const [leftCanvas, setLeftCanvas] = useState<HTMLCanvasElement>()
    const [leftCtx, setLeftCtx] = useState<CanvasRenderingContext2D>();
    const [rightCtx, setRightCtx] = useState<CanvasRenderingContext2D>();

    const handleClickClear = () => {
        if (rightCtx) {
            rightCtx.fillStyle = 'white';
            rightCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        if (leftCtx) {
            leftCtx.fillStyle = 'white';
            leftCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        if (imageInputRef.current) {
            imageInputRef.current.examplesTraining = [];
        }

        if (networkRef.current) {
            networkRef.current.seemToBe = {};
        }
    }

    const handleClickIdentity = () => {
        if (networkRef.current && imageInputRef.current && leftCtx && rightCtx && leftCanvas) {
            imageInputRef.current.examplesTraining = [];
            networkRef.current.seemToBe = {};
            const src = leftCanvas.toDataURL('image/png');
            imageInputRef.current?.loadTrain(src, leftCtx, () => {
                if (imageInputRef.current?.examplesTraining) {
                    console.log(networkRef.current?.showResult(
                        rightCtx,
                        networkRef.current?.result(imageInputRef.current?.examplesTraining)
                    ));
                }
            });
        }
    }

    useEffect(() => {
        if (leftCtx) {
            imageInputRef.current = new ImageInput(images, leftCtx, CANVAS_WIDTH, CANVAS_HEIGHT);
            imageInputRef.current?.load();
            networkRef.current = new Network(imageInputRef.current?.pixels, imageInputRef.current?.images);
        }
    }, [leftCtx]);

    const handleLeftCtx = (ctx: CanvasRenderingContext2D) => {
        setLeftCtx(ctx);
    }

    const handleRightCtx = (ctx: CanvasRenderingContext2D) => {
        setRightCtx(ctx);
    }

    const handleClickImg = (src: string) => {
        if (leftCtx) {
            const img = new Image();
            img.onload = () => {
                leftCtx.drawImage(img, 0, 0);
            }
            img.src = src;
        }
    }

    return (
        <>
            <ST.GlobalStyles/>
            <ST.AppWrapper>
                <ST.ButtonsWrapper>
                    <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onSetCtx={handleLeftCtx} onSetCanvas={setLeftCanvas}/>
                    <Canvas canDraw={false} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onSetCtx={handleRightCtx}/>
                </ST.ButtonsWrapper>
                <ST.InputsWrapper>
                    <Button onClick={handleClickClear}>Clear</Button>
                    <Button onClick={handleClickIdentity}>Identify</Button>
                </ST.InputsWrapper>
                <ST.InputsWrapper>
                    {images.map(it => <img onClick={() => handleClickImg(it)} src={it}/>)}
                </ST.InputsWrapper>
            </ST.AppWrapper>
        </>
    );
}

export default App;
