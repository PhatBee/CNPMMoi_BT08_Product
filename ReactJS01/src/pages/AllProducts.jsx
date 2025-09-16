import React, { useRef, useEffect } from 'react';
import useProducts from '../hook/useProducts';
import ProductList from '../components/ProductList';
import {searchProductsApi} from '../util/api';
import ProductSearch from '../components/ProductSearch';
import { useState } from 'react';

export default function AllProducts() {
    // default category 'all', limit 12
  const { products, loading, error, hasMore, loadMore, changeCategory, currentCategory } = useProducts('all', 12);

  const loaderRef = useRef(null);

   // Thêm state cho search
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // IntersectionObserver setup
  useEffect(() => {
    if (isSearching) return; // Nếu đang search thì không loadMore

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore, isSearching]);

  // Hàm gọi API search
  const handleSearch = async (filters) => {
    try {
      setIsSearching(true);
      const res = await searchProductsApi(filters);
      setSearchResults(res);
    } catch (err) {
      console.error("Search error", err);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2>Tất cả sản phẩm</h2>

       {/* ✅ Thanh tìm kiếm */}
      <ProductSearch onSearch={handleSearch} />

      {/* example category selector
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => changeCategory('all')} disabled={currentCategory === 'all'}>Tất cả</button>
        <button onClick={() => changeCategory('skincare')} disabled={currentCategory === 'skincare'}>Skincare</button>
        <button onClick={() => changeCategory('makeup')} disabled={currentCategory === 'makeup'}>Makeup</button>
      </div> */}

       {/* Bộ lọc danh mục (chỉ khi không search) */}
      {!isSearching && (
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => changeCategory("all")}
            disabled={currentCategory === "all"}
          >
            Tất cả
          </button>
          <button
            onClick={() => changeCategory("skincare")}
            disabled={currentCategory === "skincare"}
          >
            Skincare
          </button>
          <button
            onClick={() => changeCategory("makeup")}
            disabled={currentCategory === "makeup"}
          >
            Makeup
          </button>
        </div>
      )}

      {/* Hiển thị kết quả search nếu có */}
      {isSearching ? (
        <ProductList products={searchResults} />
      ) : (
        <>
          <ProductList products={products} />

          {/* loader sentinel */}
          <div ref={loaderRef} style={{ height: 1 }} />

          {loading && <div>Loading...</div>}
          {error && <div>Có lỗi xảy ra</div>}
          {!hasMore && <div>Đã tải hết sản phẩm</div>}
        </>
      )}
    </div>
  );
}
