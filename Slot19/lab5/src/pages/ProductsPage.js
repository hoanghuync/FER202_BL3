import React, { useState, useMemo } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Row, Col } from "react-bootstrap";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price") {
      result = result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    return result;
  }, [search, sort]);

  return (
    <div className="container py-4">
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-control"
          style={{ maxWidth: 300 }}
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="form-select" style={{ maxWidth: 150 }}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-danger">Không tìm thấy món ăn phù hợp.</h4>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
export default ProductsPage;
