import { ReactNode } from "react";

export interface IModal {
    isOpen: boolean,
    switchVisibility: () => void,
    children?: ReactNode,
}