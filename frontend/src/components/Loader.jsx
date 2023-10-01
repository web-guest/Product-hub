import Spinner from 'react-bootstrap/Spinner';

import React from 'react'

export default function Loader() {
  return (
    <div>
    <Spinner animation="border" role="status" style={{width: "100px", height:"100px", margin:"auto", display:"block" }}>
    </Spinner>
    </div>
  )
}
