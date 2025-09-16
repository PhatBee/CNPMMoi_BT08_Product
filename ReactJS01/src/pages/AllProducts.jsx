import React, { useRef, useEffect } from 'react';
import { Row, Col, Spin, Divider, Button, Typography, Card } from "antd";
import useProducts from '../hook/useProducts';
import ProductList from '../components/ProductList';
import { searchProductsApi } from '../util/api';
import ProductSearch from '../components/ProductSearch';
import { useState } from 'react';

const { Title } = Typography;


export default function AllProducts() {
  // default category 'all', limit 12
  const { products, loading, error, hasMore, loadMore, changeCategory, currentCategory } = useProducts('all', 12);

  const loaderRef = useRef(null);

  // Thêm state cho search
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchFilters, setSearchFilters] = useState({});


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
  const handleSearch = async (filters, page = 1) => {
    try {
      setIsSearching(true);

       // Nếu filters truyền vào khác rỗng → cập nhật searchFilters
    if (filters && Object.keys(filters).length > 0) {
      setSearchFilters(filters);
    }

    // Dùng searchFilters cũ nếu không truyền filters mới
    const finalFilters = filters && Object.keys(filters).length > 0 ? filters : searchFilters;

      const res = await searchProductsApi({ ...finalFilters, page, limit: 4 });
      setSearchResults(res.products);
      setSearchPage(res.page);
      setSearchTotalPages(res.totalPages);
    } catch (err) {
      console.error("Search error", err);
      setSearchResults([]);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: 30 }}>
      <Col xs={24} md={22} lg={20}>
        <Card>
          <Title level={3}>Tất cả sản phẩm</Title>

          {/* Thanh tìm kiếm */}
          <ProductSearch onSearch={handleSearch} />

          {/* Bộ lọc danh mục */}
          {!isSearching && (
            <div style={{ margin: "16px 0" }}>
              {["all", "Chăm sóc", "Đồ chơi", "Phụ kiện", "Thức ăn"].map((cat) => (
                <Button
                  key={cat}
                  type={currentCategory === cat ? "primary" : "default"}
                  onClick={() => changeCategory(cat)}
                  style={{ marginRight: 8 }}
                >
                  {cat === "all" ? "Tất cả" : cat}
                </Button>
              ))}
            </div>
          )}

          <Divider />

          {/* Danh sách sản phẩm */}
          {isSearching ? (
            <>
              <ProductList products={searchResults} />
              <div style={{ textAlign: "center", marginTop: 12 }}>
                {Array.from({ length: searchTotalPages }, (_, i) => (
                  <Button
                    key={i}
                    type={searchPage === i + 1 ? "primary" : "default"}
                    onClick={() => handleSearch({}, i + 1)}
                    style={{ marginRight: 8 }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              <ProductList products={products} />
              <div ref={loaderRef} style={{ height: 1 }} />
              {loading && (
                <div style={{ textAlign: "center", padding: 16 }}>
                  <Spin />
                </div>
              )}
              {error && <div>Có lỗi xảy ra</div>}
              {!hasMore && (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  Đã tải hết sản phẩm
                </div>
              )}
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
}
