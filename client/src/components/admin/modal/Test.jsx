import React from 'react';
import {
    Modal,
    Form,
    Input,
    Radio,
    Button,
    notification
} from 'antd';
import {create} from "../../../http/test";

const TestFormModal = (props) => {
    const {
        open,
        id,
        onCancel,
        onOk
    } = props

    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [testName, setTestName] = React.useState('')
    const [currentQuestion, setCurrentQuestion] = React.useState({
        question: '',
        answers: ['', '', '', ''],
        correctIndex: 0
    })

    const [api, contextHolder] = notification.useNotification()
    const [isEditing, setIsEditing] = React.useState(false);


    const handleAddQuestion = () => {
        if (currentQuestion.question && currentQuestion.answers.every(answer => answer)) {
            if (questions.length < 21) {
                const updatedQuestions = [...questions, currentQuestion];
                setQuestions(updatedQuestions);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setCurrentQuestion({
                    question: '',
                    answers: ['', '', '', ''],
                    correctIndex: 0
                })

                setIsEditing(false)

                if (updatedQuestions.length >= 21) {
                    const formData = prepareFormData()
                    create(formData)
                        .then(() => {
                            onOk()
                            api.success({
                                message: 'Опачки!',
                                description: 'Тест успешно создан!',
                                className: 'custom-class',
                                style: {
                                    width: 600
                                }
                            })
                        })
                        .catch((error) => {
                                api.error({
                                    message: 'Обратите внимание, тут ошибочка!',
                                    description: error,
                                    className: 'custom-class',
                                    style: {
                                        width: 600
                                    }
                                })
                            }
                        )
                }
            }
        }
    };

    const handleSaveQuestionChanges = () => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions]
            updatedQuestions[currentQuestionIndex] = currentQuestion
            setIsEditing(false)
            return updatedQuestions
        })
    }

    const handleNextQuestion = () => {
        if (isEditing) {
            handleSaveQuestionChanges()
        }

        if (currentQuestionIndex < questions.length) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setCurrentQuestion(questions[nextIndex] || {
                question: '',
                answers: ['', '', '', ''],
                correctIndex: 0
            })
        } else {
            handleAddQuestion();
        }
    }

    const handlePreviousQuestion = () => {
        if (isEditing) {
            handleSaveQuestionChanges();
        }

        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestion(questions[prevIndex]);
            setCurrentQuestionIndex(prevIndex);
        }
    }

    const prepareFormData = () => {
        const formData = {
            testName: testName,
            courseContentId: id,
            questions: [],
            answers: []
        }

        questions.forEach(question => {
            formData.questions.push(question.question);
            const answers = [];
            question.answers.forEach((answer, index) => {
                answers.push({
                    answer: answer,
                    isCorrect: index === question.correctIndex
                })
            })
            formData.answers.push(answers);
        })

        return formData
    };

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   onCancel={onCancel}
                   title={`Добавление теста к главе № ${id}`}
                   footer={[
                       <Button key="save"
                               onClick={handleSaveQuestionChanges}
                               style={{
                                   backgroundColor: 'orange',
                                   color: "#FFF"
                               }}>
                           Сохранить изменения
                       </Button>,
                       <Button key="previous"
                               onClick={handlePreviousQuestion}
                               disabled={isEditing || currentQuestionIndex === 0}
                               style={{
                                   backgroundColor: 'green',
                                   color: "#FFF"
                               }}>
                           Предыдущий
                       </Button>,
                       <Button key="next"
                               onClick={handleNextQuestion}
                               style={{
                                   backgroundColor: 'green',
                                   color: "#FFF"
                               }}>
                           {questions.length >= 21 || (isEditing && currentQuestionIndex < questions.length) ? 'Завершить редактирование' : currentQuestionIndex < questions.length ? 'Следующий' : 'Добавить'}
                       </Button>
                   ]}>
                <Form>
                    <Form.Item label={'Название теста'}
                               required
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите название теста'
                                   }
                               ]}>
                        <Input value={testName}
                               onChange={e => setTestName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label={`${questions.length < 20 ? `Вопрос №${questions.length + 1}` : `Последний вопрос`}`}
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Введите название вопроса'
                            }
                        ]}>
                        <Input value={currentQuestion.question}
                               onChange={e => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                               disabled={questions.length === 21}/>
                    </Form.Item>
                    {currentQuestion.answers.map((answer, index) => {
                        return (
                            <Form.Item key={index}
                                       label={`Ответ ${index + 1}`}
                                       required
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Введите ответ к вопросу'
                                           }
                                       ]}>
                                <Input value={answer}
                                       onChange={e => {
                                           const updatedAnswers = [...currentQuestion.answers]
                                           updatedAnswers[index] = e.target.value
                                           setCurrentQuestion({...currentQuestion, answers: updatedAnswers})
                                       }}
                                       disabled={questions.length === 21}
                                />
                            </Form.Item>
                        )
                    })}
                    <Form.Item label="Выберите правильный ответ"
                               required
                               rules={[
                                   {
                                       required: true,
                                       message: 'Выберите правильный ответ'
                                   }
                               ]}>
                        <Radio.Group value={currentQuestion.correctIndex}
                                     onChange={e => setCurrentQuestion({
                                         ...currentQuestion,
                                         correctIndex: e.target.value
                                     })}
                                     disabled={questions.length === 21}>
                            {currentQuestion.answers.map((answer, index) => (
                                <Radio key={index}
                                       value={index}
                                       disabled={questions.length === 21}>
                                    {index + 1}-й ответ
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default TestFormModal