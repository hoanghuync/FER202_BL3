import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = ({ show, message, onClose, bg = "success" }) => (
  <ToastContainer position="top-end" className="p-3">
    <Toast show={show} onClose={onClose} delay={2000} autohide bg={bg}>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);
export default CustomToast;
