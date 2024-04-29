import React from 'react';
import {
    Button,
    Input,
    Modal,
    notification
} from "antd";
import {useLanguage} from "../../../stores/LanguageStore";
import Swal from "sweetalert2";

const LanguageModal = (props) => {
    const {
        open,
        oneLanguage,
        onOk,
        onCancel
    } = props

    const [api, contextHolder] = notification.useNotification()

    let {
        create,
        update
    } = useLanguage()

    const clearData = () => setLanguageName('')

    const [languageName, setLanguageName] = React.useState('')

    React.useEffect(() => {
        if (oneLanguage)
            setLanguageName(oneLanguage?.languageName)
        else
            setLanguageName('')
    }, [oneLanguage])

    const addLanguage = () => {
        if (languageName === '')
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите название иностранного языка!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })

        create(languageName)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Иностранный язык успешно добавлен!'
                }).then(() => {
                    onOk();
                    clearData();
                });
            })
            .catch((error) => {
                return api.error({
                    message: 'Обратите внимание, тут ошибочка!',
                    description: error.response.data.message,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
    }

    const refreshLanguage = () => {
        if (languageName === '')
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите название иностранного языка!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })

        update(oneLanguage.id, languageName).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Иностранный язык успешно обновлен!'
            }).then(() => {
                onOk()
                clearData()
            })
        }).catch((error) => {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!oneLanguage ? 'Добавить иностранный язык' : 'Изменить иностранный язык'}
                   onCancel={onCancel}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button type={"primary"}
                               key='cancel'
                               onClick={() => {
                                   onCancel()
                               }}>
                           Отмена
                       </Button>,
                       <Button style={{
                           background: 'green',
                           color: 'white'
                       }}
                               key='ok'
                               onClick={() => {
                                   if (!oneLanguage)
                                       addLanguage()
                                   else
                                       refreshLanguage()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={languageName}
                       onChange={(e) => setLanguageName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название иностранного языка..."/>
            </Modal>
        </>
    )
}

export default LanguageModal