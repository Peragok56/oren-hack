import { IModal } from "../Modal/Modal.type";

export interface IModalCreateUser extends IModal{
    refreshUsers?: () => void
}