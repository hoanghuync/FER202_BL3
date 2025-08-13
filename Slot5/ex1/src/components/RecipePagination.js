import React from 'react';
import { Pagination, Dropdown, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import './RecipePagination.css';

const RecipePagination = ({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  totalItems,
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="recipe-pagination-section">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="pagination-info">
            Showing {startItem} to {endItem} of {totalItems} recipes
          </div>
        </Col>
        
        <Col md={6} className="d-flex justify-content-md-end">
          <div className="pagination-controls">
            <div className="items-per-page-container">
              <span className="items-label">Items per page:</span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm" className="items-dropdown">
                  {itemsPerPage}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => onItemsPerPageChange(6)}>6</Dropdown.Item>
                  <Dropdown.Item onClick={() => onItemsPerPageChange(9)}>9</Dropdown.Item>
                  <Dropdown.Item onClick={() => onItemsPerPageChange(12)}>12</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
            <Pagination className="pagination-custom">
              {/* First Page */}
              <Pagination.First
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <FaAngleDoubleLeft />
              </Pagination.First>
              
              {/* Previous Page */}
              <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <FaChevronLeft />
              </Pagination.Prev>
              
              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <Pagination.Item
                  key={index}
                  active={page === currentPage}
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  disabled={page === '...'}
                  className={`pagination-btn ${page === '...' ? 'ellipsis' : ''}`}
                >
                  {page}
                </Pagination.Item>
              ))}
              
              {/* Next Page */}
              <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <FaChevronRight />
              </Pagination.Next>
              
              {/* Last Page */}
              <Pagination.Last
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <FaAngleDoubleRight />
              </Pagination.Last>
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecipePagination;
