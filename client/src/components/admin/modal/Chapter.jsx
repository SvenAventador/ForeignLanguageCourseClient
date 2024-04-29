import React from 'react';
import {
    Modal,
    Form,
    Input,
    Button,
    Upload,
    message
} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {create} from "../../../http/chapter";
import Swal from "sweetalert2";
import {getAdminAll} from "../../../http/course";

const {TextArea} = Input;

const ChapterForm = (props) => {
    const {
        id,
        open,
        onOk,
        onCancel
    } = props

    const [form] = Form.useForm();
    const [chapterContent, setChapterContent] = React.useState([]);
    const [chapterGalleryContent, setChapterGalleryContent] = React.useState([]);
    const [chapterImage, setChapterImage] = React.useState([]);
    const [galleryUploadKey, setGalleryUploadKey] = React.useState(Date.now());

    const handleAddContent = () => {
        setChapterContent([...chapterContent, {chapterContent: ''}])
    }

    const handleRemoveContent = index => {
        const updatedContent = chapterContent.filter((_, i) => i !== index)
        setChapterContent(updatedContent)
    }

    const handleChangeContent = (index, value) => {
        const updatedContent = [...chapterContent]
        updatedContent[index].chapterContent = value
        setChapterContent(updatedContent)
    }

    React.useEffect(() => {
        if (!open) {
            setChapterGalleryContent([]);
            setGalleryUploadKey(Date.now());
        }
    }, [open]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields()

            if (!chapterImage.length || chapterGalleryContent.length === 0 || chapterContent.length === 0) {
                message.error('Пожалуйста, загрузите картинку главы, видео и хотя бы одно содержимое.')
                return
            }

            if (chapterContent.some(content => !content.chapterContent)) {
                message.error('Пожалуйста, заполните все поля с содержимым.')
                return
            }

            const imageTypePattern = /(\.png|\.jpg|\.jpeg)$/
            const videoTypePattern = /(\.mp4|\.mov)$/

            if (!imageTypePattern.test(chapterImage[0].name)) {
                message.error('Пожалуйста, загрузите файл изображения в формате .png, .jpg или .jpeg.')
                return
            }

            if (chapterGalleryContent.some(file => !videoTypePattern.test(file.name))) {
                message.error('Пожалуйста, загрузите файлы видео в формате .mp4 или .mov.')
                return
            }

            const formData = new FormData()
            formData.append('chapterName', values.chapterName)
            formData.append('chapterDescription', values.chapterDescription)
            formData.append('courseId', id)
            formData.append('chapterContent', JSON.stringify(chapterContent))
            formData.append('chapterImage', chapterImage[0])
            chapterGalleryContent.forEach(file => {
                formData.append('chapterGalleryContent', file)
            })

            await create(formData).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Главы добавлены!'
                }).then(async () => {
                    await getAdminAll()
                    onOk()
                })
            }).catch((error) => {
                let errorMessage = 'Произошла ошибка при добавлении главы к курсу. Пожалуйста, попробуйте еще раз.';
                if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                    const errors = error.response.data.message.errors
                    errorMessage = errors.map(err => err.msg).join('\n')
                }

                return Swal.fire({
                    icon: 'error',
                    title: 'Опачки',
                    text: errorMessage
                })
            })

            form.resetFields()
            setChapterContent([])
            setChapterGalleryContent([])
            setGalleryUploadKey(Date.now())
            setChapterImage([])
        } catch (error) {
            let errorMessage = 'Произошла ошибка при добавлении главы к курсу. Пожалуйста, попробуйте еще раз.'
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                const errors = error.response.data.message.errors
                errorMessage = errors.map(err => err.msg).join('\n');
            }

            return Swal.fire({
                icon: 'error',
                title: 'Опачки',
                text: errorMessage
            })
        }
    };

    return (
        <Modal open={open}
               title="Добавить главу"
               footer={[]}
               onCancel={onCancel}>
            <Form form={form}
                  layout="vertical"
                  onFinish={handleSave}
                  encType="multipart/form-data">
                <Form.Item name="chapterName"
                           label="Название главы"
                           rules={[
                               {
                                   required: true,
                                   message: 'Введите название главы'
                               }
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="chapterDescription"
                           label="Описание главы"
                           rules={[
                               {
                                   required: true,
                                   message: 'Введите описание главы'
                               }
                           ]}>
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item name="chapterImage"
                           label="Картинка главы">
                    <Upload onChange={info => setChapterImage(info.fileList.map(file => file.originFileObj))}
                            accept=".png,.jpg,.jpeg"
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="picture">
                        <Button icon={<UploadOutlined/>}>
                            Выберите файл
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Видео галерея">
                    <Upload multiple
                            accept=".mp4,.mov"
                            key={galleryUploadKey}
                            onChange={info => setChapterGalleryContent(info.fileList.map(file => file.originFileObj))}
                            beforeUpload={() => false}>
                        <Button icon={<UploadOutlined/>}>
                            Выберите файлы
                        </Button>
                    </Upload>
                </Form.Item>
                {chapterContent.map((content, index) => (
                    <Form.Item key={index}
                               label={`Содержимое ${index + 1}`}>
                        <Input value={content.chapterContent}
                               onChange={e => handleChangeContent(index, e.target.value)}
                               addonAfter={
                                   <Button type="link"
                                           danger
                                           onClick={() => handleRemoveContent(index)}>
                                       Удалить
                                   </Button>
                               }/>
                    </Form.Item>
                ))}
                <Button type="dashed"
                        onClick={handleAddContent}
                        style={{
                            width: '100%',
                            backgroundColor: 'green',
                            color: '#FFF'
                        }}>
                    Добавить содержимое
                </Button>
                <Button type="dashed"
                        htmlType={'submit'}
                        style={{
                            width: '100%',
                            backgroundColor: 'blue',
                            color: '#FFF',
                            marginTop: '1rem'
                        }}>
                    Добавить главу
                </Button>
            </Form>
        </Modal>
    )
}

export default ChapterForm