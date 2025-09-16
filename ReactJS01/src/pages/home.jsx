import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";

const Home = () => {
    return (
        <div style={{ padding: 20}}>
            <Result
                icon={<CrownOutlined style={{ color: "#108ee9" }} />}
                title="Chào mừng bạn đến với trang quản trị"
            />
        </div>
    )
}

export default Home;
