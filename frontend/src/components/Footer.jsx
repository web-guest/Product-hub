import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
    const currentYear=new Date().getFullYear()
  return (
    <div>
      <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>ProductHub &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
      </footer>
    </div>
  )
}
