// React
import React, { FC, memo, useCallback } from "react";
// Styles
import styles from './EducationCard.module.css'
// Types
import { IEducationCard } from "./EducationCard.type";
// Icons
import { GrDocumentDownload } from 'react-icons/gr'
// URL
import { localVariables } from '../../variables'

const EducationCard: FC<IEducationCard> = ({
    education,
    removeEducation
}) => {
    
    const downloadFile = useCallback(() => {
        // window.open(``)
        console.log(`http://${localVariables.API_URL}${education?.documents[0].url}`);
        
        const a = document.createElement('a');
        a.href = `http://${localVariables.API_URL}${education?.documents[0].url}`;
        a.download = ''; 
        document.body.appendChild(a);
        a.click();
      }, [education.documents[0].url])

    return(
        <div className={styles[`container`]}>
            <div className={styles[`label`]}>{education?.name}</div>
            <div className={styles[`description`]}>{education?.description}</div>

            <div className={styles[`button-list`]}>
                {education?.documents?.map((doc: any) => 
                    <button className={styles[`button-download`]} onClick={downloadFile}>
                        Скачать
                    </button>
                )}
                { removeEducation &&
                    <button className={styles[`button-download`]} onClick={removeEducation}>
                        Удалить
                    </button>
                }
            </div>

        </div>
    )
}

export default memo(EducationCard)