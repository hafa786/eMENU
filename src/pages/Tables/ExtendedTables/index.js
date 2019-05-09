import React from 'react';
import TableWithSwitch from './TableWithSwitch';
import TableWithLinks from './TableWithLinks';
import BigTable from './BigTable';

const ExtendedTables = () => (
  <div className="container-fluid" style={{paddingLeft: '0px'}}>
    <div className="row">
      <div className="col-md-6">
        <TableWithLinks />
      </div>
      <div className="col-md-6">
        <TableWithSwitch />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <BigTable />
      </div>
    </div>
  </div>
);

export default ExtendedTables;