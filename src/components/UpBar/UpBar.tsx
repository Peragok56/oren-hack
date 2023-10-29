// React
import React, { FC, memo, useEffect } from "react";
// Styles
import styles from './UpBar.module.css'
// Date format
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
// hooks
import { useTypedSelector } from "../../hooks/userTypedSelector";
import { profileAction } from "../../hooks/profileAction";
// Components
import SerachInput from "../searchInput/serachInput";
import { Link } from "react-router-dom";
// Icons
import { BiMessageAltDetail } from 'react-icons/bi'
import { localVariables } from "../../variables";

const UpBar: FC = () => {

    const today: Date = new Date();
    const formattedDate: string = format(today, "MMMM dd, yyyy", { locale: ruLocale });
    const capitalizedMonth: string = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    const {user, loading, error} = useTypedSelector(state => state.profile)
    const {fetchProfile} = profileAction()

    useEffect(() => {
        fetchProfile()
    }, [])

    return(
        <div className={styles[`start-block`]}>
            
            

            <div className={styles[`user-info`]}>
                {
                    user?.company?.icon && 
                    <img src={`http://${localVariables.API_URL}${user.company?.icon}`} className={styles[`company-logo`]}/>
                }
                <div>
                    <div className={styles[`firstName`]}>Привет, {user.firstName}</div>
                    <div className={styles[`date`]}>{capitalizedMonth}</div>
                </div>
            </div>

            <div className={styles[`setting`]}>
                <Link to={{pathname: '/user-chat'}}>
                    <BiMessageAltDetail size={24}/>
                </Link>
            </div>

        </div>
    )
}

export default UpBar