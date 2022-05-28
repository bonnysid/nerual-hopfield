import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import * as ST from './styled';

export interface ICanvasProps {
    width?: number;
    height?: number;
    onSetCtx?: (ctx: CanvasRenderingContext2D) => void;
    onSetCanvas?: (canvas: HTMLCanvasElement) => void;
    canDraw?: boolean;
}

export const Canvas: FC<ICanvasProps> = ({ width = 200, height = 200, onSetCtx, onSetCanvas, canDraw = true }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const [isDraw, setIsDraw] = useState(false);

    const handleMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (ctx && canDraw) {
            // @ts-ignore
            const x = e.pageX - e.currentTarget.offsetLeft;
            // @ts-ignore
            const y = e.pageY - e.currentTarget.offsetTop;
            setIsDraw(true);
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }

    const handleMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (ctx && canDraw) {
            const x = e.pageX - e.currentTarget.offsetLeft;
            const y = e.pageY - e.currentTarget.offsetTop;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath();
            setIsDraw(false);
        }
    }

    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (isDraw && ctx && canDraw) {
            const x = e.pageX - e.currentTarget.offsetLeft;
            const y = e.pageY - e.currentTarget.offsetTop;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    const handleMouseLeave: MouseEventHandler<HTMLCanvasElement> = (e) => {
        setIsDraw(false);
    }

    useEffect(() => {
        if (canvasRef.current) {
            if (onSetCanvas) {
                onSetCanvas(canvasRef.current);
            }
            const newCtx = canvasRef.current?.getContext('2d');
            setCtx(newCtx);
            if (newCtx) {
                newCtx.lineWidth = 0.05;
                newCtx.fillStyle = 'white';
                newCtx.fillRect(0, 0, width, height);

                if (onSetCtx) {
                    onSetCtx(newCtx);
                }
            }
        }
    }, [width, height, onSetCtx]);

    return (
        <ST.CanvasWrapper
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            width={width}
            height={height}
        >

        </ST.CanvasWrapper>
    )
};
