import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Swal from 'sweetalert2'

const urlBaseServer = 'http://localhost:3000'

const Register = () => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      user.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Debes completar todos los datos'
      })
      return
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error de contraseña',
        text: 'Las contraseñas no coinciden'
      })
      return
    }

    try {
      const response = await axios.post(`${urlBaseServer}/usuarios`, {
        user,
        email,
        password
      })

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Te has registrado correctamente!'
        })
        navigate('/productos')
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrarte. Inténtalo nuevamente.'
      })
    }
  }

  return (
    <Container className='my-5'>
      <Row>
        <Form onSubmit={handleSubmit} className='col-10 col-sm-8 col-md-6 col-lg-4 m-auto border border-light-subtle rounded-5 p-5 mt-5'>
          <legend className='mb-3 text-center'>¿Aún no te has registrado?</legend>
          <Form.Group className='mt-2'>
            <Form.Label>Ingresa tu nombre de usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Control
                type='text'
                onChange={(e) => setUser(e.target.value)}
                value={user}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Ingresa tu email</Form.Label>
            <InputGroup>
              <InputGroup.Text><MdAlternateEmail /></InputGroup.Text>
              <Form.Control
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Crea una contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
              <Form.Control
                type='password'
                name='password'
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Repite la contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
              <Form.Control
                type='password'
                name='confirm'
                autoComplete='off'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </InputGroup>
          </Form.Group>

          <div className='text-center'>
            <Button className='mt-3 px-5' type='submit' variant='dark'>Enviar</Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}

export default Register
