import React from 'react';
import {
    deleteAll,
    deleteOne,
    getAdminAll, getOne
} from "../../http/course";
import {
    deleteOne as deleteOneChapter,
    deleteAll as deleteAllChapter
} from '../../http/chapter'
import {
    Button,
    Image,
    notification,
    Popconfirm,
    Space,
    Table,
    Tag
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import CourseModal from "./modal/Course";
import ChapterForm from "./modal/Chapter";
import TestModal from "./modal/Test";

const Course = () => {
    const [api, contextHolder] = notification.useNotification()
    const [courseList, setCourseList] = React.useState([])

    const [isChapterOpen, setIsChapterOpen] = React.useState(false)
    const [isTestOpen, setIsTestOpen] = React.useState(false)

    const [selectedId, setSelectedId] = React.useState(0)
    const [oneCourse, setOneCourse] = React.useState([])

    React.useEffect(() => {
        getAdminAll().then(({courses}) => {
            setCourseList(courses)
        })
    }, [getAdminAll])

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => index + 1,
            width: 50
        },
        {
            title: 'Название курса',
            dataIndex: 'courseName',
            key: 'courseName',
            ellipsis: true
        },
        {
            title: 'Уровень',
            dataIndex: 'courseLevel',
            key: 'courseLevel',
            render: (text) => {
                if (text === 'Начинающий') {
                    return <Tag color="green">{text}</Tag>
                } else if (text === 'Элементарный') {
                    return <Tag color="purple">{text}</Tag>
                } else if (text === 'Средний') {
                    return <Tag color="volcano">{text}</Tag>
                } else if (text === 'Продвинутый') {
                    return <Tag color="red">{text}</Tag>
                }
            },
            ellipsis: true
        },
        {
            title: 'Выбранный язык',
            dataIndex: 'language',
            key: 'language',
            render: (language) => language.languageName,
            ellipsis: true
        },
        {
            title: 'Длительность курса',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration) => duration.durationValue,
            ellipsis: true
        },
        {
            title: 'Изображение',
            dataIndex: 'courseImage',
            key: 'courseImage',
            render: (text) => (
                <Image src={`${process.env.REACT_APP_API_PATH}${text}`}
                       width='100px'/>
            ),
        },
        {
            title: '',
            key: 'actions',
            render: (record) => {
                return (
                    <Space style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>
                        <Button style={{
                            backgroundColor: 'orange',
                            color: 'white'
                        }}
                                onClick={() => {
                                    showCourseModal(record.id)
                                }}>Изменить курс</Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить данный курс?"
                            onConfirm={() => confirmOneCourse(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>Удалить курс</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const expandableRowRender = (record) => {
        const showChapterModal = () => {
            setIsChapterOpen(true)
        }

        const handleChapterOk = () => {
            getAdminAll().then(({courses}) => {
                setCourseList(courses)
            })
            setIsChapterOpen(false)
        }

        const handleChapterCancel = () => {
            setIsChapterOpen(false)
        }

        const showTestModal = (id) => {
            setSelectedId(id)
            setIsTestOpen(true)
        }

        const handleTestOk = () => {
            getAdminAll().then(({courses}) => {
                setCourseList(courses)
            })
            setIsTestOpen(false)
        }

        const handleTestCancel = () => {
            setIsTestOpen(false)
        }

        const confirmOneChapter = (id) => {
            deleteOneChapter(id)
                .then(() => {
                    const updatedCourseList = courseList.map(course => {
                        if (course.id === record.id) {
                            const updatedChapters = course.course_contents.filter(chapter => chapter.id !== id);
                            return {...course, course_contents: updatedChapters};
                        }
                        return course;
                    });
                    setCourseList([...updatedCourseList]);
                    api.success({
                        message: 'Внимание!',
                        description: 'Данная глава успешно удалена!',
                        className: 'custom-class',
                        style: {
                            width: 600
                        }
                    });
                });
        };

        const confirmAllChapter = () => {
            deleteAllChapter(record.id)
                .then(() => {
                    const updatedCourseList = courseList.map(course => {
                        if (course.id === record.id) {
                            return {...course, course_contents: []};
                        }
                        return course;
                    });
                    setCourseList([...updatedCourseList]);
                    api.success({
                        message: 'Внимание!',
                        description: 'Все главы данного курса успешно удалены!',
                        className: 'custom-class',
                        style: {
                            width: 600
                        }
                    });
                });
        };


        const chaptersColumns = [
            {
                title: '№',
                dataIndex: 'id',
                key: 'id',
                render: (_, record, index) => index + 1,
                width: 100
            },
            {
                title: 'Название главы',
                dataIndex: 'chapterName',
                key: 'chapterName'
            },
            {
                title: 'Изображение главы',
                dataIndex: 'chapterImage',
                key: 'chapterImage',
                render: (text) => (
                    <Image src={`${process.env.REACT_APP_API_PATH}${text}`}
                           width='100px'/>
                ),
            },
            {
                title: '',
                key: 'actions',
                render: (record) => {
                    return (
                        <Space>
                            <Button onClick={() => showTestModal(record.id)}
                                    style={{
                                        backgroundColor: 'green',
                                        color: '#FFF'
                                    }}>
                                Добавить тест к главе
                            </Button>
                            <Popconfirm
                                title="Вы уверены, что хотите удалить данную главу?"
                                onConfirm={() => confirmOneChapter(record.id)}
                                okText="Да"
                                cancelText="Отмена">
                                <Button style={{
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}>Удалить главу</Button>
                            </Popconfirm>
                        </Space>
                    )
                }
            }
        ];

        return (
            <>
                <Table bordered
                       title={() => {
                           return (
                               <Space>
                                   <Button style={{
                                       backgroundColor: 'green',
                                       color: 'white'
                                   }}
                                           onClick={() => {
                                               showChapterModal()
                                           }}>Добавить главу</Button>
                                   <Popconfirm
                                       title="Вы уверены, что хотите удалить все главы данного курса?"
                                       onConfirm={confirmAllChapter}
                                       okText="Да"
                                       cancelText="Отмена">
                                       <Button style={{
                                           backgroundColor: 'red',
                                           color: 'white'
                                       }}>Удалить все главы данного курса</Button>
                                   </Popconfirm>
                               </Space>
                           )
                       }}
                       columns={chaptersColumns}
                       dataSource={record.course_contents.map((course) => ({...course, key: course.id}))}
                       pagination={false}
                />
                <ChapterForm id={record.id}
                             open={isChapterOpen}
                             onOk={handleChapterOk}
                             onCancel={handleChapterCancel}/>
                <TestModal id={selectedId}
                           open={isTestOpen}
                           onOk={handleTestOk}
                           onCancel={handleTestCancel}/>
            </>
        )
    }

    const customEmptyText = (
        <div>
            <SearchOutlined style={{fontSize: 24, color: '#999'}}/>
            <p>Пустоватенько...</p>
        </div>
    )

    const showCourseModal = (id) => {
        setIsCourseOpen(true)
        if (id)
            getOne(id).then(({course}) => {
                setOneCourse(course)
            })
        else
            setOneCourse(null)
    }

    const confirmOneCourse = (id) => {
        deleteOne(id)
            .then(() => getAdminAll())
            .then(({courses}) => {
                const updatedCourseList = courses.filter(course => course.id !== id);
                setCourseList(updatedCourseList);
                api.success({
                    message: 'Внимание!',
                    description: 'Данный курс успешно удален!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                });
            });
    }

    const confirmAllCourse = () => {
        deleteAll().then(() => {
            return getAdminAll();
        }).then(() => {
            setCourseList([]);
            api.success({
                message: 'Внимание!',
                description: 'Все курсы успешно удалены!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            });
        });
    }

    const [isCourseOpen, setIsCourseOpen] = React.useState(false)
    const handleCourseOk = () => {
        getAdminAll().then(({courses}) => {
            setCourseList(courses)
        })
        setIsCourseOpen(false)
    }
    const handleCourseCancel = () => {
        getAdminAll().then(({courses}) => {
            setCourseList(courses)
        })
        setIsCourseOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Table style={{width: '100%'}}
                   title={() => {
                       return (
                           <Space>
                               <Button style={{
                                   backgroundColor: 'green',
                                   color: 'white'
                               }}
                                       onClick={() => {
                                           showCourseModal(null)
                                       }}>Добавить курс</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить все курсы?"
                                   onConfirm={confirmAllCourse}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>Удалить все курсы</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
                   columns={columns}
                   dataSource={courseList?.map((course) => ({...course, key: course.id}))}
                   expandable={{
                       expandedRowRender: expandableRowRender,
                   }}
                   pagination={{defaultPageSize: 5, showSizeChanger: false}}
                   locale={{emptyText: customEmptyText}}
            />
            <CourseModal open={isCourseOpen}
                         oneCourse={oneCourse}
                         onOk={handleCourseOk}
                         onCancel={handleCourseCancel}/>
        </>
    );
};

export default Course;
