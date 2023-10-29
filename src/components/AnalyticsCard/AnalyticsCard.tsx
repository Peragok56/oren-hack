// React
import React, { FC, memo } from "react";
// Styles
import styles from './AnalyticsCard.module.css'
// Types
import { IAnalyticsCard } from "./AnalyticsCard.type";

const AnalyticsCard: FC<IAnalyticsCard> = ({
    label,
    value
}) => {

    const rootStyles: string[] = [
        styles[`container`]
    ]

    return(
        <div className={rootStyles.join(' ')}>

            <div className={styles[`label`]}>
                {label}

                <div className={styles[`ready-today`]}>
                    
                </div>
            </div>

            <div className={styles[`value`]}>{value}</div>

        </div>
    )
}

export default memo(AnalyticsCard)