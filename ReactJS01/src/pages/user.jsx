import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi();
            if (!res?.message) {
                setDataSource(res);
            } else {
                notification.error({
                    message: "Lỗi",
                    description: res?.message || "Đã xảy ra lỗi khi lấy danh sách người dùng"
                })
            }
        }
        fetchUser();
    }, [])

    const columns = [{
        title: "Id",
        dataIndex: "_id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    }, {
        title: "Role",
        dataIndex: "role",
    }];
    return (
        <div style={{ padding: 30 }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={"_id"}
            />
        </div>
    );
}

export default UserPage;
