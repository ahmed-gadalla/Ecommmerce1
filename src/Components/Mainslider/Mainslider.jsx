import React from 'react';
import style from './Mainslider.module.css';
import Slider from "react-slick";
import slider1 from '../../Assets/Images/1.jpg'
import slider2 from '../../Assets/Images/2.jpg'
import slider3 from '../../Assets/Images/3.jpg'

export default function Mainslider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
  };


  return <>
    <Slider {...settings}>
      <div key= '001vv'>
        <img src={slider1} alt='product 1' className='w-100'></img>
      </div>
      <div key= '002sdf'>
        <img src={slider2} alt='product2' className='w-100'></img>
      </div>
      <div key= '003ASF'>
        <img src={slider3} alt='product3' className='w-100'></img>
      </div>
    </Slider>

  </>
}
