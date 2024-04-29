import React from 'react';
import {getAllTest} from "../../http/chapter";
import {
    Image,
    Table
} from "antd";
import {v4} from "uuid";
import {SearchOutlined} from "@ant-design/icons";

const Test = () => {
    const [chapters, setChapters] = React.useState([])

    React.useEffect(() => {
        getAllTest().then(({chapters}) => {
            setChapters(chapters)
        })
    }, [])

    const columns = [
        {
            title: 'Название главы',
            dataIndex: 'chapterName',
            key: 'chapterName',
        },
        {
            title: 'Описание',
            dataIndex: 'chapterDescription',
            key: 'chapterDescription',
        },
        {
            title: 'Изображение',
            dataIndex: 'chapterImage',
            key: 'chapterImage',
            render: (text) => (
                <Image src={`${process.env.REACT_APP_API_PATH}${text}`}
                       width='100px'/>
            ),
        }
    ]

    const expandableRowRender = (record) => {
        const data = record.test ? [record.test] : []

        const column = [
            {
                title: 'Название теста',
                dataIndex: 'testName',
                key: 'testName',
            }
        ]

        return (
            <Table bordered
                   dataSource={data.map(item => ({
                       ...item,
                       key: item.id
                   }))}
                   columns={column}
                   pagination={false}
            />
        )
    }

    const customEmptyText = (
        <div>
            <SearchOutlined style={{fontSize: 24, color: '#999'}}/>
            <p>Пустоватенько...</p>
        </div>
    )

    return (
        <Table dataSource={chapters.map(chapter => ({...chapter, key: v4()}))}
               columns={columns}
               expandable={{
                   expandedRowRender: expandableRowRender,
               }}
               pagination={{defaultPageSize: 5, showSizeChanger: false}}
               locale={{emptyText: customEmptyText}}/>
    )
}

export default Test