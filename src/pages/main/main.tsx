// React
import React, { useEffect } from "react";
// Styles
import styles from './main.module.css'
import { Link } from "react-router-dom";

const Main = () => {

    return(
        <div className={styles[`container`]}>

            <div className={styles[`block-info`]}>
                <h1>ПрофТестиум</h1>    
                <h2>Пусть обучение приносит удовльствие</h2>

                <Link to={{pathname: '/signIn'}}> Войти </Link>
            </div>

            <img src="./assets/main/main-people.png"/>
        </div>
    )
}

export default Main