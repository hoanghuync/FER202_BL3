import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { FaMobileAlt, FaTag, FaDollarSign, FaImage, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function ManagePhone() {
  const [phones, setPhones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', currentPrice: '', images: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:3001/phones').then(res => setPhones(res.data));
  }, []);

  const handleShowModal = (phone = null) => {
    if (phone) {
      setForm(phone);
      setEditId(phone.id);
    } else {
      setForm({ name: '', description: '', price: '', currentPrice: '', images: '' });
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({ name: '', description: '', price: '', currentPrice: '', images: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3001/phones/${editId}`, form);
      setMessage('Update successful!');
    } else {
      await axios.post('http://localhost:3001/phones', form);
      setMessage('Added successfully!');
    }
    axios.get('http://localhost:3001/phones').then(res => setPhones(res.data));
    handleCloseModal();
    setTimeout(() => setMessage(''), 1500);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://localhost:3001/phones/${id}`);
      axios.get('http://localhost:3001/phones').then(res => setPhones(res.data));
      setMessage('Deleted successfully!');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(phones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = phones.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <div
          className="mx-auto mb-3"
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 30,
            boxShadow: '0 4px 16px rgba(102,126,234,0.10)'
          }}
        >
          <FaMobileAlt />
        </div>
        <h2 className="fw-bold text-primary mb-1" style={{ fontSize: 30 }}>Product Management</h2>
        <div className="text-muted mb-2" style={{ fontSize: 16 }}>Manage your phone products easily</div>
      </div>
      <div className="d-flex justify-content-center">
        <Card className="shadow-lg mb-4 w-100" style={{ borderRadius: 18, maxWidth: 1400 }}>
          <Card.Body>
            {message && <Alert variant="success" className="text-center">{message}</Alert>}
            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="primary"
                style={{
                  fontWeight: 600,
                  letterSpacing: 1,
                  borderRadius: 25,
                  fontSize: 16,
                  padding: '8px 24px'
                }}
                onClick={() => handleShowModal()}
              >
                <FaPlus className="me-2" /> Add New
              </Button>
            </div>
            <Table bordered hover responsive className="bg-white rounded shadow-sm align-middle" style={{ borderRadius: 12, overflow: 'hidden', minWidth: 1200 }}>
              <thead className="table-primary">
                <tr style={{ fontWeight: 600 }}>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Original Price</th>
                  <th>Sale Price</th>
                  <th>Image</th>
                  <th style={{ width: 200 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPhones.map(phone => (
                  <tr key={phone.id} style={{ background: '#fff' }}>
                    <td style={{ fontWeight: 500 }}>{phone.name}</td>
                    <td>{phone.description}</td>
                    <td>{phone.price} đ</td>
                    <td>{phone.currentPrice} đ</td>
                    <td>
                      <img
                        src={`/images/${phone.images}`}
                        alt={phone.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 12,
                          border: '1px solid #eee',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                        }}
                      />
                    </td>
                    <td style={{ background: '#fff' }}>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        style={{ borderRadius: 18, fontWeight: 600, background: '#ffc107', color: '#222', border: 'none' }}
                        onClick={() => handleShowModal(phone)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ borderRadius: 18, fontWeight: 600, background: '#dc3545', color: '#fff', border: 'none' }}
                        onClick={() => handleDelete(phone.id)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Pagination giữ nguyên */}
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </Card.Body>
        </Card>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700 }}>
            {editId ? 'Update Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaTag className="me-2 text-primary" /> Product Name
              </Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} required style={{ borderRadius: 10 }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaTag className="me-2 text-primary" /> Description
              </Form.Label>
              <Form.Control name="description" value={form.description} onChange={handleChange} required style={{ borderRadius: 10 }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaDollarSign className="me-2 text-primary" /> Original Price
              </Form.Label>
              <Form.Control name="price" value={form.price} onChange={handleChange} required style={{ borderRadius: 10 }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaDollarSign className="me-2 text-primary" /> Sale Price
              </Form.Label>
              <Form.Control name="currentPrice" value={form.currentPrice} onChange={handleChange} required style={{ borderRadius: 10 }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaImage className="me-2 text-primary" /> Image (file name)
              </Form.Label>
              <Form.Control name="images" value={form.images} onChange={handleChange} required style={{ borderRadius: 10 }} />
              <Form.Text className="text-muted">Example: iphone15promax.jpg</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} style={{ borderRadius: 18 }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ borderRadius: 18 }}>
              {editId ? 'Save Changes' : 'Add New'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ManagePhone;