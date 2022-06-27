import {Form, Button, Row, Col, Card } from 'react-bootstrap';
//import styled from 'styled-components';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'; 
 
 
const About = () => {
    // This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};


  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '100em', height: '100em' }}>
      <Tree data={orgChart} />
    </div>
  );
}


export default About;