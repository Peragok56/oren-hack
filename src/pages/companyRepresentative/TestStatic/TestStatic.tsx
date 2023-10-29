import React, { useEffect, useState } from "react";
import styles from './TestStatic.module.css';
import UpBar from "../../../components/UpBar/UpBar";
import { Link, useLocation } from "react-router-dom";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";

interface UserStats {
    userId: number;
    firstName: string;
    lastName: string;
    correctAnswers: number;
}

const TestStatic: React.FC = () => {
    const [testInfo, settestInfo] = useState<any>()
    const [userStats, setUserStats] = useState<UserStats[]>([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            // @ts-ignore
            if (location.state?.testId) {
                try {
                    // @ts-ignore
                    const response = await axios.get(`/test/findHomeRole/${location.state?.testId}`, {
                        headers: { Authorization: `Bearer ${getCookie('accessToken')}` }
                    });
                    settestInfo(response.data)
                    const testData = response.data;
                    const processedData = processData(testData);
                    setUserStats(processedData);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
        };

        fetchData();
        // @ts-ignore
    }, [location.state?.testId]);

    const processData = (testData: any): UserStats[] => {
        const userSet = new Set<number>(); // Создаем Set для хранения уникальных идентификаторов пользователей
        const processedData: UserStats[] = [];

        testData.testResultUser.forEach((user: any) => {
            // Проверяем, есть ли уже такой пользователь в Set
            if (!userSet.has(user.userId)) {
                const correctAnswers = user.questions.reduce((count: number, question: any) => {
                    const correctAnswerCount = question.answer.filter((ans: any) => ans.isCorrect && ans.select).length;
                    return count + correctAnswerCount;
                }, 0);

                processedData.push({
                    userId: user.userId,
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                    correctAnswers: correctAnswers
                });

                // Добавляем идентификатор пользователя в Set, чтобы пометить его как обработанный
                userSet.add(user.userId);
            }
        });

        return processedData;
    };

    return (
        <div className={styles[`container`]}>
            <UpBar />
            <div className={styles[`users-block`]}>
                <div className={styles[`users-block-list`]}>
                    <h1 className={styles[`users-block-label`]}>
                        Статистика теста: {testInfo?.name}
                    </h1>
                    <div className={styles[`block-list`]}>
                        <div className={styles[`table`]}>
                            <div className={styles[`line`]}>
                                <h2>ФИО</h2>
                                <h2>Кол-во правильных ответов</h2>
                                <h2>Просмотр теста</h2>
                            </div>
                            {userStats.map((user, index) => (
                                <div className={styles[`line`]}>
                                    <h2>{user.firstName} {user.lastName}</h2>
                                    <p>{user.correctAnswers}</p>
                                    <Link to={{pathname: '/view-user-test', state: {testId: testInfo?.id, userId: user.userId}}} className={styles[`actionButton`]}>Посмотреть тест</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestStatic;