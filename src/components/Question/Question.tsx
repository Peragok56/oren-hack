// React
import React, { FC, useState } from 'react';
// Styles
import styles from './Question.module.css'
// Types
import { AnswerData, QuestionProps } from './Question.type';

const Question: FC<QuestionProps> = ({
    onSave
}) => {

    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<AnswerData[]>([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
    ]);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index].text = value;
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index: number) => {
        const newAnswers = answers.map((answer, idx) => ({
        ...answer,
        isCorrect: idx === index,
        }));
        setAnswers(newAnswers);
    };

    const handleSave = () => {
        if (question.trim() === '' || answers.some(answer => answer.text.trim() === '')) {
        alert('Вопрос и ответы не могут быть пустыми!');
        return;
        }
        
        onSave({
        question,
        answers,
        });
        // Сбросить состояние для следующего вопроса
        setQuestion('');
        setAnswers([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        ]);
    };

    return(
        <div className={styles[`body`]}>
            <div className={styles[`container`]}>
                <input
                    type="text"
                    placeholder="Введите вопрос"
                    value={question}
                    className={styles[`input`]}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <br />
                {answers.map((answer, index) => (
                    <div key={index} className={styles[`questions`]}>
                        <input
                            type="text"
                            placeholder={`Ответ ${index + 1}`}
                            value={answer.text}
                            className={styles[`input`]}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                        <input
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={() => handleCorrectAnswerChange(index)}
                        />
                    </div>
                ))}
                <button onClick={handleSave} className={styles[`button`]}>Добавить вопрос</button>
            </div>
        </div>
    )
}

export default Question;