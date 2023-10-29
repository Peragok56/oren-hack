// React
import React, { FC, memo, useEffect, useRef } from "react";
// Styles
import styles from './Modal.module.css'
// Types
import { IModal } from "./Modal.type";
// icons
import { RxCross2 } from 'react-icons/rx'

const Modal: FC <IModal> = ({
    isOpen,
    switchVisibility,
    children
}) => {

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                switchVisibility();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, switchVisibility]);

    if (!isOpen) {
        return null;
    }

    return(
        <div className={styles[`modal-container`]}>
            <div className={styles[`modal-content`]} ref={modalRef}>
                <div className={styles[`modal-header`]}>
                    <button onClick={switchVisibility}>
                        <RxCross2 size={24}/>
                    </button>
                </div>  
                {children}
            </div>
        </div>
    )
}

export default memo(Modal)