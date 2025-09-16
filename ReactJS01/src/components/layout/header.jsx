import React, { useContext, useState } from "react";
import { UsergroupAddOutlined, HomeOutlined, SettingOutlined, HeartOutlined, EyeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    console.log("Auth in header: ", auth);

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated ? [{
            label: <Link to="/user">Users</Link>,
            key: "users",
            icon: <UsergroupAddOutlined />,
        }] : []),

        {
            label: <Link to="/products">Danh sách sản phẩm</Link>,
            key: "products",
            icon: <AppstoreOutlined />,
        },

        {
            label: <Link to="/favorite">Sản phẩm yêu thích</Link>,
            key: "favorite",
            icon: <HeartOutlined />,
        },

        {
            label: <Link to="/watched">Sản phẩm đã xem</Link>,
            key: "watched",
            icon: <EyeOutlined />,
        },

        {
            label: `Welcome ${auth?.user?.name ?? ""}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated ? [{
                    label: <span onClick={() => {
                        localStorage.removeItem("access_token");
                        setCurrent("home");
                        setAuth({
                            isAuthenticated: false,
                            user: {
                                email: "",
                                name: ""
                            }
                        });
                        navigate("/");
                    }}> Đăng xuất</span>,
                    key: 'logout',
                }] : [{
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login',
                }]),
            ],
        }
    ];

    const [ current, setCurrent ] = useState("email");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    }
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
};

export default Header;
