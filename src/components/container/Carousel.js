import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  Badge,
  Center,
} from '@chakra-ui/react';

import CarouselCard from './CarouselCard';

export default function Carousel(props) {
  const displayItems = props.urls.map(url => {
    return <CarouselCard src={url} />;
  });

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return <Slider {...settings}>{displayItems}</Slider>;
}
