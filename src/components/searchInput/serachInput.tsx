// React
import React, { FC, memo } from "react";
// Styles
import styles from './serachInput.module.css'
// Icons
import { GrSearch } from 'react-icons/gr'

const SearchInput: FC = () => {
    return(
        <div className={styles[`container`]}>
            
            <div className={styles[`icon`]}>
                <GrSearch />
            </div>

            <input placeholder="Поиск..."/>

        </div>
    )
}

export default memo(SearchInput);