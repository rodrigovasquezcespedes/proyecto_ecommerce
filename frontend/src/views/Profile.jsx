import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'
import FormPost from '../components/FormPost'
import Articulos from '../components/Articulos'

const urlBaseServer = 'http://localhost:3000'

const Profile = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const [nombre, setNombre] = useState('')
  const [img, setImg] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')
  const [marca, setMarca] = useState('')
  const [articulos, setArticulos] = useState([])

  if (!isAuthenticated) {
    logout()
  }

  const vaciarFormulario = () => {
    setNombre('')
    setImg('')
    setDesc('')
    setPrecio('')
    setMarca('')
  }

  const getArticulos = async () => {
    try {
      const { data: articulos } = await axios.get(urlBaseServer + '/articulos')
      setArticulos(articulos)
    } catch (error) {
      console.error('Error al obtener articulos', error)
    }
  }

  const agregarArticulo = async () => {
    try {
      const articulo = { nombre, img, desc, precio, marca }
      await axios.post(urlBaseServer + '/articulos', articulo)
      getArticulos()
      vaciarFormulario()
    } catch (error) {
      console.error('Error al agregar el articulo', error)
    }
  }

  const eliminarArticulo = async (id) => {
    try {
      await axios.delete(urlBaseServer + `/articulos/${id}`)
      getArticulos()
    } catch (error) {
      console.error('Error al eliminar el aticulo', error)
    }
  }

  useEffect(() => {
    getArticulos()
  }, [])

  return (
    <Container className='text-center my-5'>
      <Row>
        <h2>Welcome</h2>
      </Row>

      <Container>
        <Row>

          <FormPost
            setNombre={setNombre}
            setImg={setImg}
            setDesc={setDesc}
            setMarca={setMarca}
            setPrecio={setPrecio}
            agregarArticulo={agregarArticulo}
          />
          {articulos.map((articulo, index) => (
            <Articulos
              key={index}
              articulo={articulo}
              eliminarArticulo={eliminarArticulo}
            />
          ))}
        </Row>
      </Container>

    </Container>
  )
}

export default Profile
