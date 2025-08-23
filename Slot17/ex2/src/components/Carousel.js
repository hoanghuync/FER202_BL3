import React from "react";
import { Carousel } from "react-bootstrap";

const images = [
  { src: process.env.PUBLIC_URL + "/images/elaicheesecake.png", alt: "Slide 1", caption: "Món ngon mỗi ngày" },
  { src: process.env.PUBLIC_URL + "/images/uthappizza.png", alt: "Slide 2", caption: "Ưu đãi đặc biệt" },
  { src: process.env.PUBLIC_URL + "/images/vadonut.png", alt: "Slide 3", caption: "Khám phá thực đơn" }
];

const ImageCarousel = ({ autoPlay = true }) => (
  <Carousel indicators={true} controls={true} interval={autoPlay ? 3000 : null}>
    {images.map((img, idx) => (
      <Carousel.Item key={idx}>
        <img src={img.src} alt={img.alt} className="d-block w-100" style={{height: 350, objectFit: 'cover'}} />
        {img.caption && <Carousel.Caption><h5>{img.caption}</h5></Carousel.Caption>}
      </Carousel.Item>
    ))}
  </Carousel>
);

export default ImageCarousel;
