import { IModal } from "../Modal/Modal.type";

export interface IModalProfessionCreate extends IModal{
    refreshOccupation?: () => void
}