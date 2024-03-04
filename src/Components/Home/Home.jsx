import React from 'react';
import style from './Home.module.css';
import Mainslider from '../Mainslider/Mainslider';
import Products from '../Products/Products';
import SubSlider from '../SubSlider/SubSlider';


export default function Home() {
  return  <>
  <Mainslider/>
  <SubSlider/>
  <Products/>
  </>
  
}
