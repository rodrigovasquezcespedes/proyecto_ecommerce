import { createContext, useState, useEffect } from 'react'

export const TecnoContext = createContext()

const TecnoProvider = ({ children }) => {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])

  const getData = async () => {
    const response = await fetch('/products.json')
    const data = await response.json()
    const allData = data.productos.map((producto) => ({ ...producto, like: false }))
    setProductos(allData)
  }

  const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
    return formattedPrice
  }

  const agregarProducto = ({ id, nombre, desc, precio, img }) => {
    const stockProduct = carrito.find((product) => product.id === id)
    const product = { id, nombre, desc, precio, formattedPrice: formatPrice(precio), img, count: 1 }
    if (stockProduct !== undefined) {
      carrito[carrito.findIndex((producto) => producto.id === product.id)].count++
      setCarrito([...carrito])
    } else {
      setCarrito([...carrito, product])
    }
  }

  const incrementar = (index) => {
    carrito[index].count++
    setCarrito([...carrito])
  }

  const decrementar = (index) => {
    const { count } = carrito[index]
    if (count > 1) {
      carrito[index].count--
      setCarrito([...carrito])
    } else {
      carrito.splice(index, 1)
      setCarrito([...carrito])
    }
  }

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito]
    nuevoCarrito.splice(index, 1)
    setCarrito(nuevoCarrito)
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const addAndRemoveFavorite = (id) => {
    const newProductos = productos.map(producto => {
      if (producto.id === id) {
        return {
          ...producto,
          like: !producto.like
        }
      }
      return producto
    })
    setProductos(newProductos)
  }

  useEffect(() => {
    getData()
  }, [])

  const dataProductos = {
    productos,
    agregarProducto,
    carrito,
    incrementar,
    decrementar,
    addAndRemoveFavorite,
    formatPrice,
    eliminarProducto,
    vaciarCarrito
  }

  return (
    <TecnoContext.Provider value={dataProductos}>
      {children}
    </TecnoContext.Provider>
  )
}

export default TecnoProvider
