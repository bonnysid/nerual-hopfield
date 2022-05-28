import { FC } from 'react';
import * as ST from './styled';

export interface IButtonProps {
    onClick: () => void;
    children: any;
}

export const Button: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <ST.Wrapper onClick={onClick}>
            {children}
        </ST.Wrapper>
    )
}
