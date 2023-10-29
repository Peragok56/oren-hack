import React, { useEffect, useState } from 'react';
import styles from './TestJoin.module.css';
import { useLocation } from 'react-router-dom';
import axios from '../../../axios/axios';
import { getCookie } from '../../../auth/authMethod';
  
  const TestTaker: React.FC = () => {
    const [test, setTest] = useState<any>()
    const [userAnswers, setUserAnswers] = useState<number[]>(Array(test?.questions?.length).fill(-1));
    const [formattedTest, setFormattedTest] = useState<any>(null);

    const location = useLocation()

    const handleAnswerSelection = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = answerIndex;
        setUserAnswers(newAnswers);
    };

    const handleSubmitTest = () => {
        if (formattedTest) {
            // Поместите код для отправки formattedTest на сервер здесь
            console.log('Ответы пользователя:', formattedTest);
        } else {
            alert('Пожалуйста, ответьте на все вопросы перед отправкой.');
        }
    };

    useEffect(() => {
        // @ts-ignore
        axios.get(`/test/find/${location.state.testId}`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setTest(res.data)
        })
        // @ts-ignore
    }, [location.state.testId])

    useEffect(() => {
        if (test) {
            const formattedTestCopy = { ...test };
            formattedTestCopy.questions.forEach((question: any, questionIndex: number) => {
                const selectedAnswerIndex = userAnswers[questionIndex];
                question.answer.forEach((answer: any, answerIndex: number) => {
                    answer.select = answerIndex === selectedAnswerIndex;
                });
            });
            setFormattedTest(formattedTestCopy);
        }
    }, [userAnswers, test]);

    if (!test) {
        return <></>
    }
  
    return (
        <div className={styles.container}>
            <div className={styles[`main-container`]}>
                <h2 className={styles.title}>Прохождение теста: {test?.name}</h2>
                {test?.questions.map((question: any, questionIndex: number) => (
                <div key={questionIndex} className={styles.question}>
                    <h3>Вопрос {questionIndex + 1}:</h3>
                    <p className={styles.questionLabel}>{question.question}</p>
                    <ul className={styles.list}>
                    {question?.answer.map((answer: any, answerIndex: number) => (
                        <li
                        key={answerIndex}
                        className={styles.listItem}
                        onClick={() => handleAnswerSelection(questionIndex, answerIndex)}
                        >
                        {answer.text}
                        <input
                            type="radio"
                            name={`question-${questionIndex}`} 
                            checked={userAnswers[questionIndex] === answerIndex}
                            readOnly 
                        />
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
                <button
                    onClick={handleSubmitTest}
                    className={styles.button}
                >
                    Отправить ответы
                </button>
            </div>
        </div>
    );
  };
  
  export default TestTaker;