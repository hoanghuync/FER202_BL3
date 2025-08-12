import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { companies as initialCompanies } from "./data/companies";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);

  const handleSearch = () => {
    let data = initialCompanies;

    if (searchTerm) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (category) {
      data = data.filter((c) => c.category === category);
    }

    
    if (sortOption === "startAsc") {
      data = [...data].sort((a, b) => a.start - b.start);
    } else if (sortOption === "startDesc") {
      data = [...data].sort((a, b) => b.start - a.start);
    } else if (sortOption === "duration") {
      data = [...data].sort((a, b) => (a.end - a.start) - (b.end - b.start));
    }

    setFilteredCompanies(data);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Company List</h1>

      {/* Search */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">-- Sort by --</option>
            <option value="startAsc">Start Year ↑</option>
            <option value="startDesc">Start Year ↓</option>
            <option value="duration">Duration (start–end)</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Auto">Auto</option>
            <option value="Technology">Technology</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Button variant="success" onClick={handleSearch}>
            Apply Filters
          </Button>
        </Col>
      </Row>

      {/* Table */}
      {filteredCompanies.length === 0 ? (
        <p>No result</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
