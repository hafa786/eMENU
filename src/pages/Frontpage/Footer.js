import React from 'react';
import Imatra from './imatra.png';
import Saimaa from './saimaa.png';
import './style.css'


const Footer = () => (
  <footer className="footer" style={{backgroundColor: '#ed6c41', height: '80px'}}>
   
      <nav className="pull-left" style={{width: '33%', marginLeft: '10px'}}>
      <p style={{fontSize: '14px', lineHeight: '1.2', marginTop: '32px', color: 'white'}}>
       <a style={{color: 'white'}} href="#/privacy">Yksityisyys</a> / <a style={{color: 'white'}} href="#/terms">Käyttöehdot</a>  / <a style={{color: 'white'}} href="#/faq">FAQ</a></p>
      </nav>

      <nav className="pull-left" style={{width: '33%', textAlign: 'center'}}>
        <h4 className="footerCopyright" style={{fontSize: '14px', lineHeight: '1.2', marginTop: '32px', color: 'white'}}>©Copyright 2019</h4>
      </nav>

      <nav className="pull-right" style={{width: '33%', textAlign: 'right'}}>
        <img src={Imatra}  style={{marginTop: '4%', width: '40%', marginRight: '10px'}} />
        {/* <img src={Saimaa} style={{marginTop: '5px', width: '40%'}}/> */}
      </nav> 
      
   
  </footer>
);

export default Footer;