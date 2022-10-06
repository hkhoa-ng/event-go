import React, { Component, useState } from 'react';
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
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';

import CarouselCard from './CarouselCard';
import { FaLandmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

export default function Carousel(props) {
  const [slider, setSlider] = useState(null);

  const displayItems = props.events.map(e => {
    return (
      <CarouselCard src={e.img} name={e.name} description={e.description} />
    );
  });

  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box position="relative" width="full" overflow={'hidden'}>
      <IconButton
        variant="solid"
        color="white"
        fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }}
        size="lg"
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={{ base: '10%', md: '3%' }}
        top={{ base: '15%', md: '50%' }}
        transform={'translate(0%, -50%)'}
        zIndex={1}
        onClick={() => slider?.slickPrev()}
        icon={<FaChevronLeft />}
      />
      {/* Right Icon */}
      <IconButton
        variant="solid"
        color="white"
        fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }}
        size="lg"
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right={{ base: '10%', md: '3%' }}
        top={{ base: '15%', md: '50%' }}
        transform={'translate(0%, -50%)'}
        zIndex={1}
        onClick={() => slider?.slickNext()}
        icon={<FaChevronRight />}
      >
        <BiRightArrowAlt />
      </IconButton>
      <Slider {...settings} ref={slider => setSlider(slider)}>
        {displayItems}
      </Slider>
    </Box>
  );
}
