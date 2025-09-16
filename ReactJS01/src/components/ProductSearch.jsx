// frontend/src/components/ProductSearch.js
import React, { useState } from "react";

function ProductSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [minViews, setMinViews] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, category, minPrice, maxPrice, discount, minViews });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Tìm kiếm..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <input placeholder="Danh mục" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Giá từ" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <input placeholder="Giá đến" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <input placeholder="Khuyến mãi từ %" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      <input placeholder="Lượt xem từ" value={minViews} onChange={(e) => setMinViews(e.target.value)} />
      <button type="submit">Tìm kiếm</button>
    </form>
  );
}

export default ProductSearch;
