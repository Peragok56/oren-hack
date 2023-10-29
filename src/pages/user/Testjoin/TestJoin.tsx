import React, { useEffect, useState } from 'react';
import styles from './TestJoin.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import axios from '../../../axios/axios';
import { getCookie } from '../../../auth/authMethod';
import Swal from 'sweetalert2';
import UpBar from '../../../components/UpBar/UpBar';
  
  const TestTaker: React.FC = () => {
    const [test, setTest] = useState<any>()
    const [userAnswers, setUserAnswers] = useState<number[]>(Array(test?.questions?.length).fill(-1));
    const [formattedTest, setFormattedTest] = useState<any>(null);

    const location = useLocation()
    const history = useHistory()

    const handleAnswerSelection = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = answerIndex;
        setUserAnswers(newAnswers);
    };

    const handleSubmitTest = () => {
        if (formattedTest) {
            
            const formattedQuestions = formattedTest.questions.map((question: any) => {
                const { testId, answer, ...rest } = question;
                const formattedAnswers = answer.map((ans: any) => {
                    const { id, questionId, ...restAns } = ans;
                    return { ...restAns };
                });
                return { ...rest, answers: formattedAnswers };
            });
    
            const dataToSend = {
                testId: test.id,
                questions: formattedQuestions
            };

            axios.post('/test/resultUser/create', dataToSend, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Отлично',
                        text: `Вы завершили тест`,
                      })
                      .then((status) => {
                        if (status.isConfirmed) {
                            history.goBack()
                        }
                      })
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ой',
                        text: `Ошибка при завершение теста`,
                      })
                });
        } else {
            alert('Пожалуйста, ответьте на все вопросы перед отправкой.');
        }
    };

    useEffect(() => {
        // @ts-ignore
        axios.get(`/test/find/${location.state.testId}`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            const { company, ...testWithoutCompany } = res.data;
            console.log(testWithoutCompany);
            setTest(testWithoutCompany);
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

            <UpBar />

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