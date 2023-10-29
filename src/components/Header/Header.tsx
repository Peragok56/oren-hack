// React
import React, { useEffect, useRef, useState } from 'react';
// Styles
import styles from './Header.module.css';
// Icons
import { BsArrowLeft } from 'react-icons/bs'
import { FaRegNoteSticky } from 'react-icons/fa6'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { IoExitOutline } from 'react-icons/io5'
// react-riuter-dom
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    localStorage.clear()
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    window.location.pathname = '/'
  }

  return (
    <div className={`${styles.header} ${isOpen ? styles.active: ''}`} ref={navigationRef}>
      
      <div className={styles[`button-container`]}>
        <button className={styles.toggleButton} onClick={toggleMenu}>
            <BsArrowLeft size={25}/>
        </button>
      </div>

      {isOpen && (
        <nav className={styles.menu}>
          <NavLink to={{pathname: '/user-main'}} activeClassName='activeNav'>
            <AiOutlineHome />
             <div className={styles[`link-label`]}>Главная</div>
          </NavLink>
          <NavLink to={{pathname: '/user-tests'}} activeClassName='activeNav'>
            <FaRegNoteSticky />
            <div className={styles[`link-label`]}> Тестирование </div>  
          </NavLink>
          <NavLink to={{pathname: '/user-profile'}} activeClassName='activeNav'>
            <AiOutlineUser />
            <div className={styles[`link-label`]}> Профиль </div>
          </NavLink>
          <div className={styles[`button`]} onClick={logOut}>
            <IoExitOutline />
            <button>Выйти</button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;