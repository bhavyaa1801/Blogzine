import React from 'react'
import logoImg from "../assets/BLOG_LOGO.png";

function Logo({ width = '50px', height ='60px' }) {
  return (
    <img src={logoImg} alt="Logo" style={{ width , height}} />
  )
}

export default Logo
