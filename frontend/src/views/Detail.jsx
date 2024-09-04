import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { TecnoContext } from '../context/TecnoContext'
import { Container, Row, Card, Button, Toast, ToastContainer } from 'react-bootstrap'

const Detail = () => {
  const { id } = useParams()
  const { productos, agregarProducto } = useContext(TecnoContext)
  const [productoDetail, setProductoDetail] = useState({})
  const navigate = useNavigate()
  const getData = () => {
    const informacion = productos.find(producto => producto.id === id)
    setProductoDetail(informacion)
  }

  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = () => {
    agregarProducto(productoDetail)

    setShowToast(true)

    setTimeout(() => setShowToast(false), 3000)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {productoDetail &&
        <Container className='my-5'>
          <Row>
            <div className='d-flex flex-column flex-md-row'>
              <Card className='col-md-6'>
                <Card.Img className='imagen-card' variant='top' src={productoDetail.img} />
              </Card>
              <Card className='col-md-6'>
                <Card.Body>
                  <Card.Title>{productoDetail.nombre}</Card.Title>
                  <Card.Text>{productoDetail.marca}</Card.Text>
                  <Card.Text>{productoDetail.desc}</Card.Text>
                  <Card.Text>{productoDetail.precio}</Card.Text>
                  <ul>
                    {productoDetail.especificaciones &&
                      productoDetail.especificaciones.map((especificacion, index) => {
                        const [key, value] = Object.entries(especificacion)[0]
                        return (
                          <li key={index}>
                            <strong>{key}:</strong>{value}

                          </li>
                        )
                      })}
                  </ul>
                  <div className='d-flex justify-content-center gap-2'>
                    <Button onClick={() => navigate('/productos')} variant='dark'>Regresar</Button>
                    <Button className='px-3' onClick={handleAddToCart} variant='dark'>Añadir</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <ToastContainer position='top-end' className='p-3'>
              <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                <Toast.Body>El producto se ha agregado al carrito!</Toast.Body>
              </Toast>
            </ToastContainer>
          </Row>
        </Container>}
    </>
  )
}

export default Detail
