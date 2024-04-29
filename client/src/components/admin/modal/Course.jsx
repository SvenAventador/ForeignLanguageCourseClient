import React from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    notification,
    Select,
    Upload
} from "antd";
import {useLanguage} from "../../../stores/LanguageStore";
import {UploadOutlined} from "@ant-design/icons";
import {
    create,
    update
} from "../../../http/course";

const {Option} = Select;

const CourseFormModal = (props) => {
    const {
        open,
        oneCourse,
        onOk,
        onCancel
    } = props

    const [form] = Form.useForm()
    const {getAll} = useLanguage()

    const [languageList, setLanguageList] = React.useState([])
    const [courseImage, setCourseImage] = React.useState([])

    const [api, contextHolder] = notification.useNotification()

    React.useEffect(() => {
        getAll().then(({languages}) => {
            setLanguageList(languages)
        })
    }, [getAll])

    React.useEffect(() => {
        if (open && oneCourse) {
            form.setFieldsValue({
                courseName: oneCourse.courseName,
                courseDescription: oneCourse.courseDescription,
                courseLevel: oneCourse.courseLevel,
                language: oneCourse.languageId,
                duration: oneCourse.durationId
            })

            if (oneCourse.courseImage && courseImage.length === 0) {
                setCourseImage([
                    {
                        uid: '-1',
                        name: oneCourse.courseImage,
                        status: 'done',
                        url: `${process.env.REACT_APP_API_PATH}${oneCourse.courseImage}`
                    }
                ])
            }
        } else {
            form.setFieldsValue({
                courseName: '',
                courseDescription: '',
                courseLevel: 'Начинающий',
                language: languageList.length > 0 ? languageList[0].id : undefined,
                duration: 1
            })
            setCourseImage([])
        }
    }, [
        open,
        oneCourse,
        form,
        languageList,
        onOk
    ]);

    const handleUpload = ({file}) => {
        setCourseImage([file])
        return false
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (!courseImage || courseImage.length === 0) {
                return api.error({
                    message: 'Обратите внимание, тут ошибочка!',
                    description: 'Пожалуйста, выберите изображение!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            }

            const file = courseImage[0]
            const allowedExtensions = /\.(png|jpe?g)$/i

            if (!allowedExtensions.test(file.name)) {
                return api.error({
                    message: 'Обратите внимание, тут ошибочка!',
                    description: 'Пожалуйста, выберите изображение формата .jpg, .png, .jpeg!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            }

            const formData = new FormData()
            formData.append('courseName', values.courseName)
            formData.append('courseDescription', values.courseDescription)
            formData.append('courseLevel', values.courseLevel)
            formData.append('languageId', values.language)
            formData.append('durationId', values.duration)
            formData.append('courseImage', courseImage[0])

            if (oneCourse) {
                await update(oneCourse.id, formData).then(() => {
                    api.success({
                        message: 'Внимание!',
                        description: 'Курс успешно изменен!',
                        className: 'custom-class',
                        style: {
                            width: 600
                        }
                    })
                    onOk()
                }).catch((error) => {
                    api.error({
                        message: 'Обратите внимание, тут ошибочка!',
                        description: error.response.data.message,
                        className: 'custom-class',
                        style: {
                            width: 600
                        }
                    })
                })
            } else {
                await create(formData).then(() => {
                    api.success({
                        message: 'Внимание!',
                        description: 'Курс успешно создан!',
                        className: 'custom-class',
                        style: {
                            width: 600
                        }
                    })
                    onOk()
                }).catch((error) => {
                    api.error({
                        message: 'Обратите внимание, тут ошибочка!',
                        description: error.response.data.message,
                        className: 'custom-class',
                        style: {
                            width: 600
                        }
                    })
                })
            }
        } catch (error) {
            api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: error,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   onCancel={onCancel}
                   footer={[]}
                   centered
                   title={!oneCourse ? 'Добавление курса' : 'Изменение курса'}>
                <Form form={form}
                      layout={"vertical"}
                      onFinish={handleOk}
                      autoComplete="off">
                    <Form.Item name="courseName"
                               label="Название курса"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите название курса!'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="courseDescription"
                               label="Описание курса"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите описание курса!'
                                   }
                               ]}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name="courseLevel"
                               label="Уровень курса"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, выберите уровень курса!'
                                   }
                               ]}>
                        <Select>
                            <Option value="Начинающий">
                                Начинающий
                            </Option>
                            <Option value="Элементарный">
                                Элементарный
                            </Option>
                            <Option value="Средний">
                                Средний
                            </Option>
                            <Option value="Продвинутый">
                                Продвинутый
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="courseImage"
                               label="Изображение курса">
                        <Upload customRequest={handleUpload}
                                fileList={courseImage}
                                listType="picture">
                            <Button icon={<UploadOutlined/>}>
                                Загрузить
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Language"
                               name="language">
                        <Select placeholder="Пожалуйста, выберите иностранный язык">
                            {languageList.map(language => (
                                <Option key={language.id}
                                        value={language.id}>
                                    {language.languageName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Duration"
                               name="duration">
                        <Select placeholder="Пожалуйста, выберите длительность курса">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
                                let suffix;
                                if (month === 1) {
                                    suffix = 'месяц';
                                } else if (month >= 2 && month <= 4) {
                                    suffix = 'месяца';
                                } else {
                                    suffix = 'месяцев';
                                }
                                return (
                                    <Option key={month}
                                            value={month}>
                                        {month} {suffix}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                style={{
                                    width: '100%'
                                }}>
                            {oneCourse ? "Изменить данные" : "Добавить данные"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CourseFormModal