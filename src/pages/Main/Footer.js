import React from 'react';
import Imatra from './imatra.png';
import Saimaa from './saimaa.png';


const Footer = () => (
  <footer className="footer" style={{backgroundColor: '#ed6c41', height: '80px'}}>
   
      <nav className="pull-left" style={{width: '33%'}}>
       <p style={{fontSize: '14px', lineHeight: '1.2', marginTop: '4px', color: 'white', marginLeft: '10px'}}>Privacy</p>
       <p style={{fontSize: '14px', lineHeight: '1.2', color: 'white'}}>Terms & Conditions</p>
       <p style={{fontSize: '14px', lineHeight: '1.2', color: 'white'}}>FAQ</p>
      </nav>

      <nav className="pull-left" style={{width: '33%', textAlign: 'center'}}>
        <h3 style={{marginTop: '20px', color: 'white'}}>©Copyright 2019</h3>
      </nav>

      <nav className="pull-right" style={{width: '33%', textAlign: 'right'}}>
        <img src={Imatra}  style={{marginTop: '5px', width: '40%'}} />
        {/* <img src={Saimaa} style={{marginTop: '5px', width: '40%'}}/> */}
      </nav> 
      
   
  </footer>
);

export default Footer;