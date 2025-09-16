import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, clearProductDetail } from "../hook/productDetailSlice";
import { fetchSimilarProducts } from "../hook/productSlice";
import { Card, Spin, Alert, Row, Col, Typography, Button } from "antd";
import ProductCard from "../components/ProductCard";

const { Title, Paragraph } = Typography;

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetail);
  const { items: similar, loading: loadingSimilar } = useSelector(
    (state) => state.similarProducts
  );

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    dispatch(fetchSimilarProducts(id));

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

        {/* Sản phẩm tương tự */}
        <div style={{ marginTop: 30 }}>
          <Title level={3}>Sản phẩm tương tự</Title>
          {loadingSimilar ? (
            <Spin />
          ) : (
            <Row gutter={[16, 16]}>
              {similar.map((p) => (
                <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          )}
        </div>

      </Col>
    </Row>
  );
}
