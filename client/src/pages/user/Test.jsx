import React, {useState, useEffect} from 'react';
import {getOne} from "../../http/test";
import {useParams} from "react-router-dom";

const Test = () => {
    const {id} = useParams();
    const [test, setTest] = useState({})
    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(0)

    useEffect(() => {
        getOne(id).then(({test}) => {
            setTest(test);
        });
    }, [id])

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
                ...prevAnswers,
                [questionId.toString()]: answer
            }
        ))
    }

    const handleSubmit = () => {
        let totalScore = 0
        test.test_questions.forEach((question) => {
            if (answers[question.id.toString()] === question.test_answers.find(ans => ans.isCorrect).answer) {
                totalScore++;
            }
        })
        setScore(totalScore)
    }

    return (
        <section className="test">
            <div className="test__container">
                <h2 className="test__name">{test.testName}</h2>
                {
                    test.test_questions && test.test_questions.map((question) => (
                        <div className="test__question"
                             key={question.id}>

                            <p className="test__question-text">
                                {question.question}
                            </p>

                            {
                                question.test_answers && question.test_answers.map((answer) => (
                                    <div key={answer.id}>
                                        <input type="radio"
                                               name={`answer${question.id}`}
                                               value={answer.answer}
                                               onChange={() => handleAnswerChange(question.id, answer.answer)}
                                        />
                                        <label className="test__answer-label">
                                            {answer.answer}
                                        </label>
                                    </div>
                                ))
                            }

                        </div>
                    ))
                }

                <button onClick={handleSubmit}>Проверить результат</button>
                {
                    score > 0 && <p>Ваш результат: {score} из {test.test_questions.length}</p>
                }

            </div>
        </section>
    );
};

export default Test;