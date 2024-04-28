import React from 'react';
import {
    Table,
    Button,
    Space
} from 'antd';
import {useLanguage} from "../../stores/LanguageStore";
import {SearchOutlined} from "@ant-design/icons";
import LanguageModal from "./modal/Language";

const Language = () => {
    const [language, setLanguage] = React.useState([])

    let {
        getAll,
        getOne
    } = useLanguage()

    React.useEffect(() => {
        getAll().then(({languages}) => {
            setLanguage(languages)
        })
    }, [getAll])

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => index + 1
        },
        {
            title: 'Название языка',
            dataIndex: 'languageName',
            key: 'languageName',
            ellipsis: true
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space size={"large"}>
                    <Button style={{
                        backgroundColor: "orange",
                        color: '#FFF'
                    }}
                            onClick={() => showModal(record.id)}>Изменить иностранный язык</Button>
                </Space>
            ),
        }
    ]

    const customEmptyText = (
        <div>
            <SearchOutlined style={{
                fontSize: 24,
                color: '#999'
            }}/>
            <p>Пустоватенько...</p>
        </div>
    )

    const [isOpen, setIsOpen] = React.useState(false)
    const handleOk = () => {
        getAll().then(({languages}) => {
            setLanguage(languages)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    const [oneLanguage, setOneLanguage] = React.useState([])
    const showModal = (id) => {
        setIsOpen(true)
        if (id)
            getOne(id).then(({language}) => {
                setOneLanguage(language)
            })
        else
            setOneLanguage(null)
    }

    return (
        <>
            <Table columns={columns}
                   dataSource={language.map((language) => ({...language, key: language.id}))}
                   bordered
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
                   title={() => {
                       return (
                           <Space size="large">
                               <Button style={{
                                   backgroundColor: 'green',
                                   color: 'white'
                               }}
                                       onClick={() => showModal(null)}>Добавить иностранный язык</Button>
                           </Space>
                       )
                   }}
            />
            <LanguageModal open={isOpen}
                           oneLanguage={oneLanguage}
                           onOk={handleOk}
                           onCancel={handleCancel}/>
        </>
    );
};

export default Language;
