// frontend/src/components/ProductSearch.js
import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";


function ProductSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [minViews, setMinViews] = useState("");

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSearch(values);
  };

  return (
     <Form form={form} layout="inline" onFinish={handleFinish} style={{ marginBottom: 16 }}>
      <Row gutter={[8, 8]} style={{ width: "100%" }}>
        <Col xs={24} md={8}>
          <Form.Item name="keyword">
            <Input placeholder="Tìm kiếm sản phẩm..." allowClear />
          </Form.Item>
        </Col>
        <Col xs={12} md={4}>
          <Form.Item name="category">
            <Input placeholder="Danh mục" />
          </Form.Item>
        </Col>
        <Col xs={12} md={4}>
          <Form.Item name="minPrice">
            <Input placeholder="Giá từ" />
          </Form.Item>
        </Col>
        <Col xs={12} md={4}>
          <Form.Item name="maxPrice">
            <Input placeholder="Giá đến" />
          </Form.Item>
        </Col>
        {/* <Col xs={12} md={4}>
          <Form.Item name="discount">
            <Input placeholder="Khuyến mãi từ %" />
          </Form.Item>
        </Col>
        <Col xs={12} md={4}>
          <Form.Item name="minViews">
            <Input placeholder="Lượt xem từ" />
          </Form.Item>
        </Col> */}
        <Col xs={24} md={4}>
          <Button type="primary" htmlType="submit" block>
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductSearch;
