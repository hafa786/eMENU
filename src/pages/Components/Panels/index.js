import React from 'react';
import AccordionGroup from './AccordionGroup';
import TabGroup from './TabGroup';
const Panels = () => (
  <div className="content">
    <div className="container-fluid" style={{paddingLeft: '0px'}}>
      <AccordionGroup />
      <TabGroup />
    </div>
  </div>
);

export default Panels;