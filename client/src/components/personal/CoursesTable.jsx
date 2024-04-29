import React from 'react';
import {getStatistic} from "../../http/personal";
import {
    Table,
    Tag
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {CURRENT_COURSE_PATH} from "../../utils/consts";

const CoursesTable = ({id}) => {
    const [statistics, setStatistics] = React.useState();

    React.useEffect(() => {
        getStatistic(id).then((data) => {
            setStatistics(data);
        })
    }, [id])

    const columns = [
        {
            title: 'Название курса',
            dataIndex: 'courseName',
            key: 'courseName',
        },
        {
            title: 'Уровень',
            dataIndex: 'courseLevel',
            key: 'courseLevel',
        },
        {
            title: 'Язык',
            dataIndex: 'language',
            key: 'language',
            render: (language) => language.languageName,
        }
    ]

    const expandableRowRender = (record) => {
        const chaptersColumns = [
            {
                title: 'Название главы',
                dataIndex: 'chapterName',
                key: 'chapterName',
            },
            {
                title: 'Описание главы',
                dataIndex: 'chapterDescription',
                key: 'chapterDescription',
            },
            {
                title: 'Сдал/не сдал',
                dataIndex: 'isComplete',
                key: 'isComplete',
                render: (isComplete) => (
                    isComplete ? <Tag color="green">Глава закрыта</Tag> : <Tag color="red">Глава не закрыта</Tag>
                ),
            },
            {
                title: 'Результат теста',
                dataIndex: 'testResult',
                key: 'testResult',
                render: (testResult) => {
                    return typeof testResult === 'number' ? `Баллы: ${testResult}` : 'Тест не пройден';
                },
            },
            {
                title: 'Перейти к курсу',
                dataIndex: 'goToCourse',
                key: 'goToChapter',
                render: (_, chapter) => {
                    return (
                        !chapter.isComplete && <NavLink style={{
                            color: '#00FFFFFF'
                        }} to={`${CURRENT_COURSE_PATH}/${chapter.courseId}`}>
                            Перейти
                        </NavLink>
                    )
                },
            }
        ];

        const chaptersData = record.course_contents.map((chapter) => {
            const onlyTest = statistics?.test.find((test) => test.courseContentId === chapter.id)
            const userTest = statistics?.userTest.find((test) => test.testId === onlyTest?.id)
            return {
                ...chapter,
                key: chapter.id,
                isComplete: userTest && userTest.isComplete && userTest.testResult !== 0,
                testResult: userTest ? userTest.testResult : 0,
            }
        })

        return (
            <Table columns={chaptersColumns}
                   dataSource={chaptersData}
                   pagination={false}
            />
        )
    }

    const customEmptyText = (
        <div>
            <SearchOutlined style={{
                fontSize: 24,
                color: '#999'
            }}/>
            <p>Пустоватенько...</p>
        </div>
    )

    return (
        <Table style={{
            width: '100%'
        }}
               columns={columns}
               dataSource={statistics?.courses.map((course) => ({...course, key: course.id, expandable: true}))}
               expandable={{
                   expandedRowRender: expandableRowRender,
                   rowExpandable: record => record.course_contents.length > 0
               }}
               pagination={{
                   defaultPageSize: 5,
                   showSizeChanger: false
               }}
               locale={{
                   emptyText: customEmptyText
               }}
               bordered
        />
    )
}

export default CoursesTable