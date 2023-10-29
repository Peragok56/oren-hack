// React
import React, { useCallback, useState } from "react";
// Styles
import styles from './Education.module.css'
import UpBar from "../../../components/UpBar/UpBar";
import ModalFileUpload from "../../../components/ModalFileUpload/ModalFileUpload";

const Education = () => {

    const [modalUpload, setModalUpload] = useState<boolean>(false)

    const switchVisibility = useCallback(() => {
        setModalUpload(prev => !prev)
    }, [])

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Учебный материал

                    <button className={styles[`actionButton`]} onClick={switchVisibility}>
                        Добавить
                    </button>
                </h1>

                    <div className={styles[`block-list`]}>
                        
                    </div>
                </div>
            </div>

            <ModalFileUpload 
                isOpen={modalUpload}
                switchVisibility={switchVisibility}
            />

        </div>
    )
}

export default Education