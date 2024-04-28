import React from 'react';
import {getOne} from "../../http/test";
import {getOne as getOneChapter} from "../../http/chapter";
import {
    useNavigate,
    useParams
} from "react-router-dom";
import Swal from "sweetalert2";
import {createTest} from "../../http/userTest";
import {useUser} from "../../stores/UserStore";
import {CURRENT_COURSE_PATH} from "../../utils/consts";
import {useCourse} from "../../stores/CourseStore";

const Test = () => {
    const {id} = useParams();
    const [test, setTest] = React.useState({})
    const [answers, setAnswers] = React.useState({})
    const [chapter, setChapter] = React.useState({})
    const {user} = useUser()
    const {currentCourse} = useCourse()
    const navigate = useNavigate()
    React.useEffect(() => {
        getOne(id).then(({test}) => {
            setTest(test);

            test && getOneChapter(test.courseContentId).then(({chapter}) => {
                setChapter(chapter)
            })
        })
    }, [id])

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
                ...prevAnswers,
                [questionId.toString()]: answer
            }
        ))
    }

    const handleSubmit = async () => {
        let totalScore = 0
        let answeredQuestions = Object.keys(answers).length

        if (answeredQuestions !== test.test_questions.length) {
            await Swal.fire({
                title: 'Опачки...',
                text: 'Пожалуйста, ответь на все вопросы. Ты умника и обязательно справишься💝',
                icon: 'error'
            });
            return;
        }

        test.test_questions.forEach((question) => {
            if (answers[question.id.toString()] === question.test_answers.find(ans => ans.isCorrect).answer) {
                totalScore++;
            }
        })

        createTest(+totalScore, +test.id, +user.id).then((data) => {
            console.log(data)
            if (data.candidate) {
                Swal.fire({
                    title: data.candidate.isComplete
                        ?
                        'Внимание!'
                        :
                        'Опачки!',
                    text: data.candidate.isComplete
                        ?
                        'Поздравляем с успешной сдачей главы!'
                        :
                        'К сожалению, Вы не прошли данную главу. ' +
                        'Пожалуйста, повторите материал и возвращайтесь с новыми силами! ' +
                        'Наша команда в Вас верит!',
                    icon: data.candidate.isComplete
                        ? 'success'
                        : 'info'
                }).then(() => {
                    navigate(`${CURRENT_COURSE_PATH}/${chapter.courseId}`)
                })
            } else if (data.userResult) {
                Swal.fire({
                    title: data.userResult.isComplete
                        ?
                        'Внимание!'
                        :
                        'Опачки!',
                    text: data.userResult.isComplete
                        ?
                        'Поздравляем с успешной сдачей главы!'
                        :
                        'К сожалению, Вы не прошли данную главу. ' +
                        'Пожалуйста, повторите материал и возвращайтесь с новыми силами! ' +
                        'Наша команда в Вас верит!',
                    icon: data.userResult.isComplete
                        ? 'success'
                        : 'info'
                }).then(() => {
                    navigate(`${CURRENT_COURSE_PATH}/${chapter.courseId}`)
                })
            }
        })
    }

    return (
        <section className="test">
            <div className="test__container">
                {test && Object.keys(test).length > 0 ? (
                    <>
                        <h2 className="test__name">{test.testName}</h2>
                        {test.test_questions && test.test_questions.map((question) => (
                            <div className="test__question" key={question.id}>
                                <p className="test__question-text">{question.question}</p>
                                {question.test_answers && question.test_answers.map((answer) => (
                                    <div key={answer.id}>
                                        <input
                                            type="radio"
                                            name={`answer${question.id}`}
                                            value={answer.answer}
                                            onChange={() => handleAnswerChange(question.id, answer.answer)}
                                        />
                                        <label className="test__answer-label">{answer.answer}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button className="btn-reset test__btn" onClick={handleSubmit}>
                            Проверить результат
                        </button>
                    </>
                ) : (
                    <p style={{
                        fontSize: '20pt',
                        fontFamily: 'Comic Sans MS'
                    }}>Извините, на данный момент, нет теста к главе. Наша команда со всем разберется🥰🥰🥰</p>
                )}
            </div>
        </section>
    );
};

export default Test;