// React
import React, { useState } from 'react';
// Components
import Question from '../../../components/Question/Question';
// Types
import { QuestionData } from '../../../components/Question/Question.type';
// Styles
import styles from './TestCreate.module.css'
// Icons
import { AiOutlineCheck } from 'react-icons/ai'
import UpBar from '../../../components/UpBar/UpBar';
import axios from '../../../axios/axios';
import { getCookie } from '../../../auth/authMethod';
import Swal from 'sweetalert2';

import { useHistory } from 'react-router-dom';

const CompanyRepresentatiTestCreator: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [testTitle, setTestTitle] = useState<string>('');

  const history = useHistory()

  const handleQuestionSave = (questionData: QuestionData) => {
    setQuestions([...questions, questionData]);
  };

  const handleSaveTest = () => {
    if (questions.length === 0 || testTitle.trim() === '') {
      alert('Тест должен содержать хотя бы один вопрос и иметь название!');
      return;
    }

    const test = {
      name: testTitle,
      questions: questions,
    };

    console.log('Сохраненный тест:', test);

    axios.post('/test/create', test, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
    .then(res => {
      console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Отлично',
        text: `Тест успешно создан`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          history.goBack()
        }
      })

    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Ой',
        text: `Произошла ошибка при загрузке теста`,
      })
    })
  };

  return (
    <div className={styles[`container`]}>

      <UpBar />

      <div className={styles[`main-container`]}>
        <h2 className={styles[`title`]}>Создание теста</h2>

        <input
          type="text"
          placeholder="Введите название теста"
          value={testTitle}
          onChange={(e) => setTestTitle(e.target.value)}
        />
        <br />
        {questions.map((question, index) => (
          <div key={index} className={styles[`question`]}>
            <h3>Вопрос {index + 1}:</h3>
            <p className={styles[`question-label`]}>{question.question}</p>
            <ul className={styles[`list`]}>
              {question.answers.map((answer, ansIndex) => (
                <li key={ansIndex} className={styles[`list-item`]}>
                  {answer.text} 
                  {
                    answer.isCorrect ? 
                    <div className={styles[`trueAnswer`]}>
                        <AiOutlineCheck />
                    </div> 
                    : 
                    ''
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Question onSave={handleQuestionSave} />
        <br />
        <button onClick={handleSaveTest} className={styles[`button`]}>Сохранить тест</button>
      </div>
    </div>
  );
};

export default CompanyRepresentatiTestCreator;