import React from "react";
import Carousel from "../components/Carousel";

const HomePage = () => (
  <div className="container py-4">
    <Carousel />
    <div className="mt-4 text-center">
      <h2>Chào mừng đến với FoodCart!</h2>
      <p className="lead">Khám phá thực đơn đa dạng, ưu đãi hấp dẫn và trải nghiệm mua sắm tiện lợi.</p>
      <p>Đăng ký tài khoản để sử dụng đầy đủ chức năng giỏ hàng, yêu thích và quản lý cá nhân.</p>
    </div>
  </div>
);

export default HomePage;
