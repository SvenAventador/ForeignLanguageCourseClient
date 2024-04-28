import React from 'react';
import {getAllCertificates} from "../../http/certificate";
import {NavLink} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {Table} from "antd";

const MyComponent = ({id}) => {
    const [certificates, setCertificates] = React.useState([])
    React.useEffect(() => {
        getAllCertificates(id).then(({certificates}) => {
            setCertificates(certificates)
        })
    }, [id])

    const certificateColumn = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => index + 1
        },
        {
            title: 'Мои сертификаты',
            dataIndex: 'certificate',
            key: 'certificate',
            render: (text, _) => {
                return (
                    <NavLink to={`${process.env.REACT_APP_API_PATH}${text}`}
                             download>
                        {text}
                    </NavLink>
                )
            }
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

    return (
        <Table style={{
            width: '100%',
            marginTop: '4rem'
        }}
               bordered
               pagination={{
                   defaultPageSize: 5,
                   showSizeChanger: false
               }}
               locale={{
                   emptyText: customEmptyText
               }}
               columns={certificateColumn}
               dataSource={certificates.map((certificate) => ({...certificate, key: certificate.id}))}
        />
    );
};

export default MyComponent;
