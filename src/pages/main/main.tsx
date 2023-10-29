// React
import React, { useEffect } from "react";
// Styles
import styles from './main.module.css'
import { Link } from "react-router-dom";

const Main = () => {

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>ПрофТестиум</h1>
                </div>
                <nav className={styles.menu}>
                    <ul>
                        <li>Возможности</li>
                        <li>Тарифы</li>
                        <li>Внедрение</li>
                    </ul>
                </nav>
                <div className={styles.auth}>
                    <Link to="/signUp">Зарегистрировать новую школу</Link>
                    <Link to="/signUp">Регистрация</Link>
                </div>
            </header>
            <main>
                <section className={styles.section}>
                    <div className={styles.sectionInfo}>
                        <h2>Возможности</h2>
                        <p>ПрофТестиум предоставляет вам уникальные возможности для обучения и развития. У нас вы найдете разнообразные курсы, интерактивные уроки и многое другое.</p>
                    </div>
                    <img src="./assets/main/main-people.png"/>
                </section>
                <section className={styles.section} style={{background: '#5B43DA', display: 'block'}}>
                    <h2 style={{color: 'white'}}>Тарифы</h2>
                    
                    <div className={styles.tarifs}>
                        <div className={styles.tarif}>
                            <h1>Бесплатный</h1>

                            <ul>
                                <li>Беззатратность</li>
                                <li>Основные функции</li>
                                <li>Опыт использования</li>
                            </ul>

                            <button disabled>Оформить</button>
                        </div>

                        <div className={styles.tarif}>
                            <h1>Малый бизес</h1>

                            <ul>
                                <li>Доступная цена</li>
                                <li>Поддержка клиентов</li>
                                <li>Расширенные возможности</li>
                            </ul>

                            <button disabled>Оформить</button>
                        </div>

                        <div className={styles.tarif}>
                            <h1>Предприятие</h1>

                            <ul>
                                <li>Масштабируемость</li>
                                <li>Безопасность</li>
                                <li>Индивидуализированный сервис</li>
                            </ul>

                            <button disabled>Оформить</button>
                        </div>

                        <div className={styles.tarif}>
                            <h1>Корпорация</h1>

                            <ul>
                                <li>Высокая производительность</li>
                                <li>Глобальное обслуживание</li>
                                <li>Корпоративная безопасность</li>
                            </ul>

                            <button disabled>Оформить</button>
                        </div>
                    </div>
                </section>
                <section className={styles.section}>
                    <h2>Отзывы</h2>

                    <div className={styles.reviews}>
                        <div className={styles[`review-card`]}>
                            <h3>Андрей Г.</h3>
                            <h2>Очень удобный сервис</h2>
                        </div>

                        <div className={styles[`review-card`]}>
                            <h3>Виктор К.</h3>
                            <h2>Отзывчивый интерфейс</h2>
                        </div>

                        <div className={styles[`review-card`]}>
                            <h3>Андрей Г.</h3>
                            <h2>Отзывчивая поддержка</h2>
                        </div>
                    </div>
                </section>
                <section className={styles.section} style={{gap: 36}}>
                    <h2>Внедрение</h2>
                    <p>Наши специалисты помогут вам с внедрением системы в вашей школе. Мы также предлагаем высококачественное VR-оборудование для более интерактивного обучения.</p>
                </section>
            </main>
            <footer className={styles.footer}>
                <div className={styles.logo}>
                    <h1>ПрофТестиум</h1>

                    <h3>Наша поддержка отвечает моментально  +7(932) 845-33-55</h3>
                </div>
            </footer>
        </div>
    )
}

export default Main