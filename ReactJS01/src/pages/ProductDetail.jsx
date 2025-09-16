import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, clearProductDetail } from "../hook/productDetailSlice";
import { Card, Spin, Alert, Row, Col, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(fetchProductDetail(id));

    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, id]);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  if (error) return <Alert message="Lỗi" description={error} type="error" showIcon />;

  if (!product) return null;

  return (
    <Row justify="center" style={{ marginTop: 30 }}>
      <Col xs={24} md={20} lg={16}>
        <Card>
          <Row gutter={24}>
            <Col xs={24} md={10}>
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Col>
            <Col xs={24} md={14}>
              <Title level={2}>{product.name}</Title>
              <Paragraph>
                <b>Giá:</b>{" "}
                {product.price ? `${product.price.toLocaleString()} đ` : "Liên hệ"}
              </Paragraph>
              <Paragraph>
                <b>Danh mục:</b> {product.category}
              </Paragraph>
              <Paragraph>
                <b>Khuyến mãi:</b> {product.discount ? `${product.discount}%` : "Không"}
              </Paragraph>
              <Paragraph>
                <b>Lượt xem:</b> {product.views}
              </Paragraph>
              <Button type="primary" size="large">
                Thêm vào giỏ hàng
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
