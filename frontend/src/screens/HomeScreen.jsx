import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productapiSlice'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

export default function HomeScreen() {
  const {pageNumber, keyword}= useParams()
  const {data, isLoading, error}= useGetProductsQuery({keyword, pageNumber})

  return (
    <>
    {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
    { isLoading ? (
      <Loader/>
    ) : error ? (<div>
      {error?.data?.message || error.error}
    </div>) : (
      <>
      <Meta title={"ProductHub"}/>
      <h1>Latest products</h1>
    <Row>
        {data.products.map((product)=>{
            return(
            <Col key={product._id} sm ={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>)
        }
        )}
    </Row>
    <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
      </>
    )}
    
    </>
  )
}
