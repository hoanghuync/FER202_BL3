import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";

// Hàm xác thực đầu vào (ví dụ: kiểm tra độ dài tối thiểu)
const validateInput = (value) => {
  return value.length >= 5; // Giả sử giá trị phải có ít nhất 5 ký tự
};

function ValidatedInput() {
  const [value, setValue] = useState(""); // State lưu trữ giá trị đầu vào
  const [isValid, setIsValid] = useState(true); // State theo dõi tính hợp lệ của đầu vào
  const [errorMessage, setErrorMessage] = useState(""); // State lưu thông báo lỗi
  const [isSubmitted, setIsSubmitted] = useState(false); // State để track form submission

  // useEffect để thực hiện xác thực mỗi khi giá trị đầu vào thay đổi
  useEffect(() => {
    // Chỉ validate khi có giá trị (không validate khi input rỗng ban đầu)
    if (value.length > 0) {
      const isValidInput = validateInput(value);
      setIsValid(isValidInput); // Cập nhật tính hợp lệ
      
      if (!isValidInput) {
        setErrorMessage("Giá trị phải có ít nhất 5 ký tự!"); // Cập nhật thông báo lỗi nếu không hợp lệ
      } else {
        setErrorMessage(""); // Xóa thông báo lỗi nếu hợp lệ
      }
    } else {
      // Reset validation state khi input rỗng
      setIsValid(true);
      setErrorMessage("");
    }
  }, [value]); // useEffect sẽ chạy lại mỗi khi value thay đổi

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && value.trim()) {
      setIsSubmitted(true);
      // Reset form sau 3 giây
      setTimeout(() => {
        setIsSubmitted(false);
        setValue("");
        setIsValid(true);
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setIsSubmitted(false); // Reset submission state khi user thay đổi input
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h4 className="mb-0">
                <FaCheckCircle className="me-2" />
                Form Validation với useEffect
              </h4>
            </Card.Header>
            
            <Card.Body className="p-4">
              {isSubmitted && (
                <Alert variant="success" className="mb-4">
                  <FaCheckCircle className="me-2" />
                  <strong>Thành công!</strong> Form đã được gửi với giá trị: "{value}"
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="validatedInput" className="mb-4">
                  <Form.Label className="fw-bold">
                    Nhập một giá trị (tối thiểu 5 ký tự)
                  </Form.Label>
                  
                  <Form.Control
                    type="text"
                    value={value}
                    onChange={handleInputChange} // Cập nhật giá trị khi người dùng thay đổi
                    isValid={isValid && value.length > 0} // Hiển thị trạng thái hợp lệ
                    isInvalid={!isValid && value.length > 0} // Hiển thị trạng thái không hợp lệ
                    placeholder="Nhập ít nhất 5 ký tự..."
                    className="form-control-lg"
                  />
                  
                  {/* Hiển thị thông báo lỗi nếu không hợp lệ */}
                  <Form.Control.Feedback type="invalid">
                    <FaExclamationTriangle className="me-2" />
                    {errorMessage}
                  </Form.Control.Feedback>
                  
                  {/* Hiển thị thông báo thành công nếu hợp lệ */}
                  <Form.Control.Feedback type="valid">
                    <FaCheckCircle className="me-2" />
                    Giá trị hợp lệ!
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Hiển thị thông tin về validation */}
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <div className={`badge ${isValid && value.length > 0 ? 'bg-success' : 'bg-secondary'} me-2`}>
                      {isValid && value.length > 0 ? '✓' : '○'}
                    </div>
                    <span className="small text-muted">
                      Độ dài hiện tại: {value.length} ký tự
                    </span>
                  </div>
                  
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className={`progress-bar ${value.length >= 5 ? 'bg-success' : 'bg-warning'}`}
                      style={{ width: `${Math.min((value.length / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-1">
                    <small className="text-muted">0</small>
                    <small className="text-muted">5 ký tự</small>
                    <small className="text-muted">10+</small>
                  </div>
                </div>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!isValid || !value.trim()}
                    size="lg"
                    className="fw-bold"
                  >
                    <FaPaperPlane className="me-2" />
                    Gửi Form
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Thông tin về cách hoạt động */}
          <Card className="mt-4 border-0 bg-light">
            <Card.Body className="p-3">
              <h6 className="fw-bold mb-2">Cách hoạt động:</h6>
              <ul className="small mb-0">
                <li><strong>useEffect</strong> theo dõi sự thay đổi của <code>value</code></li>
                <li>Mỗi khi <code>value</code> thay đổi, validation được thực hiện</li>
                <li><code>isValid</code> và <code>errorMessage</code> được cập nhật</li>
                <li>Form chỉ submit được khi <code>isValid = true</code></li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ValidatedInput;
