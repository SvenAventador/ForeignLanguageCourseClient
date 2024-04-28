import React from 'react';
import {createCertificate, getAllUser} from "../../http/certificate";
import {
    Button,
    Image,
    Table,
    Tag
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";

const User = () => {
    const [users, setUser] = React.useState([])

    React.useEffect(() => {
        getAllUser().then(({response}) => {
            setUser(response)
        })
    }, [getAllUser])

    const allUser = users.users
    const userCourses = users.userCourses
    const allCourse = users.courses
    const allContents = users.courseContents
    const allTest = users.tests
    const userTest = users.userTests

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => index + 1
        },
        {
            title: 'Никнейм пользователя',
            dataIndex: 'userNickname',
            key: 'userNickname'
        },
        {
            title: 'Почта пользователя',
            dataIndex: 'userEmail',
            key: 'userEmail'
        },
        {
            title: 'Фамилия пользователя',
            dataIndex: 'userSurname',
            key: 'userSurname',
            render: text => text || 'Не указано'
        },
        {
            title: 'Имя пользователя',
            dataIndex: 'userName',
            key: 'userName',
            render: text => text || 'Не указано'
        },
        {
            title: 'Отчество пользователя',
            dataIndex: 'userPatronymic',
            key: 'userPatronymic',
            render: text => text || 'Не указано'
        },
        {
            title: 'Номер пользователя',
            dataIndex: 'userPhone',
            key: 'userPhone',
            render: text => text || 'Не указано'
        }
    ]

    const expandableCourseRowRender = (record) => {
        const chapters = allContents.filter((chapter) => chapter.courseId === record.id);
        const only_test = allTest.filter((test) => chapters.some(chapter => test.courseContentId === chapter.id));

        const userPassedTestIds = userTest.filter(test => only_test.some(current_test => current_test.id === test.testId))

        const column = [
            {
                title: '№',
                dataIndex: 'id',
                key: 'id',
                render: (_, chapter, index) => index + 1
            },
            {
                title: 'Название главы',
                dataIndex: 'chapterName',
                key: 'chapterName',
                ellipsis: true
            },
            {
                title: 'Изображение',
                dataIndex: 'chapterImage',
                key: 'chapterImage',
                render: (text) => (
                    <Image src={`${process.env.REACT_APP_API_PATH}${text}`} width='100px'/>
                )
            },
            {
                title: 'Итог',
                dataIndex: 'id',
                key: 'isPassed',
                render: (chapterId) => {
                    const isChapterPassed = userPassedTestIds.some(test => test.testId === only_test.find(test => test.courseContentId === chapterId).id);
                    return (
                        isChapterPassed
                            ? <Tag color="green">Пройдена</Tag>
                            : <Tag color="red">Не пройдена</Tag>
                    );
                }
            }
        ];

        return (
            <Table
                bordered
                pagination={false}
                columns={column}
                dataSource={chapters}
                locale={{emptyText: customEmptyText}}
            />
        );
    }

    const expandableUserRowRender = (record) => {
        const courseIdsForUser = userCourses
            .filter(userCourse => userCourse.userId === record.id)
            .map(userCourse => userCourse.courseId)

        const courses = allCourse?.filter(course => courseIdsForUser.includes(course.id));

        const isAllChaptersPassed = (chapters) => {
            return chapters.every(chapter => {
                const chapterTests = allTest.filter(test => test.courseContentId === chapter.id)
                return chapterTests.some(test => userTest.some(userTest => userTest.testId === test.id && userTest.isComplete))
            })
        }

        const columns = [
            {
                title: '№',
                dataIndex: 'id',
                key: 'id',
                render: (_, record, index) => index + 1
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
                title: 'Изображение',
                dataIndex: 'courseImage',
                key: 'courseImage',
                render: (text) => (
                    <Image src={`${process.env.REACT_APP_API_PATH}${text}`}
                           width='100px'/>
                )
            },
            {
                title: 'Действие',
                key: 'action',
                render: (_, course) => {
                    const courseChapters = allContents.filter(chapter => chapter.courseId === course.id);
                    const showCertificateButton = isAllChaptersPassed(courseChapters);

                    if (showCertificateButton) {
                        return (
                            <Button style={{
                                backgroundColor: 'green',
                                color: 'white'
                            }}
                                    onClick={() => {
                                        createCertificate(record.id, course.id).then(() => {
                                            return Swal.fire({
                                                title: 'УРА УРА УРА!',
                                                text: 'Сертификат успешно отправлен пользователю на печать🥰',
                                                icon: 'success'
                                            })
                                        }).catch((error) => {
                                            return Swal.fire({
                                                title: 'УРА УРА УРА!',
                                                text: error,
                                                icon: 'success'
                                            })
                                        })
                                    }}>
                                Отправить сертификат
                            </Button>
                        );
                    } else {
                        return <Tag color={"red"}>
                            Главы не все пройдены</Tag>;
                    }
                },
            },
        ]

        return <Table bordered
                      key={record.id}
                      columns={columns}
                      dataSource={courses && courses.length > 0 ? courses.map((item) => ({...item, key: item.id})) : []}
                      expandable={{
                          expandedRowRender: expandableCourseRowRender,
                      }}
                      pagination={false}
                      locale={{
                          emptyText: customEmptyText
                      }}
        />
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
        <Table columns={columns}
               dataSource={allUser && allUser.length > 0 ? allUser.map((item) => ({...item, key: item.id})) : []}
               bordered
               expandable={{
                   expandedRowRender: expandableUserRowRender,
               }}
               pagination={{
                   defaultPageSize: 1,
                   showSizeChanger: false
               }}
               locale={{
                   emptyText: customEmptyText
               }}/>
    );
};

export default User;
