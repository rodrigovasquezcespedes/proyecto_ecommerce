import { Container, Row } from 'react-bootstrap'
import { TecnoContext } from '../context/TecnoContext'
import { useContext, useState } from 'react'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const { productos, addAndRemoveFavorite } = useContext(TecnoContext)
  const [categorias, setCategorias] = useState('')
  const [marcas, setMarcas] = useState('')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('')

  // Obtener categorías únicas
  const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))]

  // Obtener marcas filtradas según la categoría seleccionada
  const marcasFiltradas = categorias === ''
    ? [...new Set(productos.map(producto => producto.marca))]
    : [...new Set(productos
        .filter(producto => producto.categoria === categorias)
        .map(producto => producto.marca))
      ]

  // Filtrar productos por categoría y marca seleccionadas
  const productosFiltrados = productos.filter(producto =>
    (categorias === '' || producto.categoria === categorias) &&
    (marcas === '' || producto.marca === marcas)
  )

  // Ordenar productos
  const productosOrdenados = productosFiltrados.slice().sort((a, b) => {
    if (ordenSeleccionado === 'price-asc') return a.precio - b.precio
    if (ordenSeleccionado === 'price-desc') return b.precio - a.precio
    if (ordenSeleccionado === 'name-asc') return a.nombre.localeCompare(b.nombre)
    if (ordenSeleccionado === 'name-desc') return b.nombre.localeCompare(a.nombre)
    return 0
  })

  return (
    <Container className='py-5'>

      <Row>
        <div className='d-flex gap-5 my-5'>
          <select
            className='form-select mb-4'
            value={categorias}
            onChange={e => {
              setCategorias(e.target.value)
              setMarcas('')
            }}
          >
            <option value=''>Todas las Categorías</option>
            {categoriasUnicas.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>

          <select
            className='form-select mb-4'
            value={marcas}
            onChange={e => setMarcas(e.target.value)}
          >
            <option value=''>Todas las Marcas</option>
            {marcasFiltradas.map((marca, index) => (
              <option key={index} value={marca}>{marca}</option>
            ))}
          </select>

          <select
            className='form-select mb-4'
            value={ordenSeleccionado}
            onChange={e => setOrdenSeleccionado(e.target.value)}
          >
            <option value='default'>Ordenar por</option>
            <option value='price-asc'>Precio de menor a mayor</option>
            <option value='price-desc'>Precio de mayor a menor</option>
            <option value='name-asc'>Nombre: A-Z</option>
            <option value='name-desc'>Nombre: Z-A</option>
          </select>
        </div>
      </Row>

      <Row>
        {productosOrdenados.map(producto => (
          <ProductCard
            key={producto.id}
            producto={producto}
            addAndRemoveFavorite={addAndRemoveFavorite}
          />
        ))}
      </Row>
    </Container>
  )
}

export default Products
