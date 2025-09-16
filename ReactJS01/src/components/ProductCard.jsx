import React from 'react';
import { Card } from "antd";


export default function ProductCard({ product }) {
  return (
    <Card
      hoverable
      cover={
        product.image ? (
          <img alt={product.name} src={product.image} style={{ height: 200, objectFit: "cover" }} />
        ) : (
          <div style={{ height: 200, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            No Image
          </div>
        )
      }
    >
      <Card.Meta
        title={product.name}
        description={
          <>
            <div><b>Giá:</b> {product.price ? `${product.price.toLocaleString()} đ` : "Liên hệ"}</div>
            <div><b>Danh mục:</b> {product.category}</div>
          </>
        }
      />
    </Card>
  );
}
