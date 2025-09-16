// src/components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <div>Không có sản phẩm</div>;
  }
  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}

// function ProductList({ products }) {
//   return (
//     <div>
//       {products.length === 0 ? (
//         <p>Không có sản phẩm nào</p>
//       ) : (
//         products.map((p) => (
//           <div key={p.id}>
//             <h3>{p.name}</h3>
//             <p>Giá: {p.price}</p>
//             <p>Danh mục: {p.category}</p>
//             <p>Khuyến mãi: {p.discount}%</p>
//             <p>Lượt xem: {p.views}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



