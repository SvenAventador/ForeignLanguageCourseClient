import React from 'react';
import {useNavigate} from "react-router-dom";
import {useUser} from "../../stores/UserStore";
import Swal from "sweetalert2";
import {MAIN_PATH} from "../../utils/consts";
import {
    BookFilled,
    GlobalOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    QuestionCircleOutlined,
    TrophyOutlined
} from "@ant-design/icons";
import {
    Button,
    Layout,
    Menu
} from "antd";
import Sider from "antd/es/layout/Sider";
import Language from "../../components/admin/Language";
import Course from "../../components/admin/Course";
import Test from "../../components/admin/Test";
import User from "../../components/admin/User";

const AdminPanel = () => {
    const history = useNavigate()
    const [collapsed, setCollapsed] = React.useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('language')

    let {
        logoutUser
    } = useUser()
    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                history(MAIN_PATH);
            });
        })
    }

    function getItem(label, key, icon, onClick) {
        return {
            label,
            key,
            icon,
            onClick
        };
    }

    const items = [
        getItem('Иностранные языки', '1', <GlobalOutlined />, () => setSelectedMenuItem('language')),
        getItem('Курсы', '2', <BookFilled />, () => setSelectedMenuItem('course')),
        getItem('Тесты к курсам', '3', <QuestionCircleOutlined />, () => setSelectedMenuItem('test')),
        getItem('Пользователи и сертификаты', '4', <TrophyOutlined />,() => setSelectedMenuItem('users')),
        getItem('Выход', '5', <LogoutOutlined/>, () => handleLogout()),
    ]

    return (
        <Layout style={{
            height: '100vh',
        }}>
            <Sider collapsible
                   style={{
                       background: 'white'
                   }}
                   width={500}
                   collapsed={collapsed}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button type="text"
                            onClick={toggleCollapsed}
                            className="collapse-button"
                            style={{
                                backgroundColor: '#fff',
                                width: '80px',
                                marginRight: '1rem',
                                marginBottom: '.5rem'
                            }}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </div>
                <Menu defaultSelectedKeys={['1']}
                      mode="inline"
                      items={items} />
            </Sider>
            <Layout className="site-layout">
                <Layout.Content>
                    {selectedMenuItem === 'language' && <Language/>}
                    {selectedMenuItem === 'course' && <Course />}
                    {selectedMenuItem === 'test' && <Test/>}
                    {selectedMenuItem === 'users' && <User />}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminPanel;
