import model from '../models/addressModel.js'

// Obtener todas las direcciones de un usuario
const getUserAddresses = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId
    const addresses = await model.getAddressesByUserId(usuarioId)
    res.json(addresses)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las direcciones' })
  }
}

// Crear una nueva dirección
const createNewAddress = async (req, res) => {
  try {
    const newAddress = await model.createAddress(req.body)
    res.status(201).json(newAddress)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la dirección' })
  }
}

// Actualizar una dirección existente
const updateExistingAddress = async (req, res) => {
  try {
    const idDireccion = req.params.idDireccion
    const updatedAddress = await model.updateAddress(idDireccion, req.body)
    res.json(updatedAddress)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la dirección' })
  }
}

// Eliminar una dirección
const deleteAddressById = async (req, res) => {
  try {
    const idDireccion = req.params.idDireccion
    const deletedAddress = await model.deleteAddress(idDireccion)
    res.json(deletedAddress)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la dirección' })
  }
}
export default { getUserAddresses, createNewAddress, updateExistingAddress, deleteAddressById }
