document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('suscripcionForm')
  const nombre = document.getElementById('nombre')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const confirmPassword = document.getElementById('confirmPassword')
  const edad = document.getElementById('edad')
  const telefono = document.getElementById('telefono')
  const direccion = document.getElementById('direccion')
  const ciudad = document.getElementById('ciudad')
  const codigoPostal = document.getElementById('codigoPostal')
  const dni = document.getElementById('dni')
  const modal = document.getElementById('modal')
  const modalClose = document.getElementById('modalClose')
  const modalTexto = document.getElementById('modalTexto')

  const fields = [
    { el: nombre, validator: validateNombre },
    { el: email, validator: validateEmail },
    { el: password, validator: validatePassword },
    { el: confirmPassword, validator: validateConfirmPassword },
    { el: edad, validator: validateEdad },
    { el: telefono, validator: validateTelefono },
    { el: direccion, validator: validateDireccion },
    { el: ciudad, validator: validateCiudad },
    { el: codigoPostal, validator: validateCodigoPostal },
    { el: dni, validator: validateDni }
  ]

  function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}Error`)
    errorElement.textContent = message
    input.classList.add('invalid')
  }

  function clearError(input) {
    const errorElement = document.getElementById(`${input.id}Error`)
    errorElement.textContent = ''
    input.classList.remove('invalid')
  }

  function validateNombre() {
    const value = nombre.value.trim()
    if (value.length <= 6 || !value.includes(' ')) {
      showError(nombre, 'Debe tener más de 6 caracteres y al menos un espacio.')
      return false
    }
    return true
  }

  function validateEmail() {
    const value = email.value.trim()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(value)) {
      showError(email, 'Ingrese un email con formato válido.')
      return false
    }
    return true
  }

  function validatePassword() {
    const value = password.value
    const lengthValid = value.length >= 8
    const hasLetter = /[A-Za-z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    if (!lengthValid || !hasLetter || !hasNumber) {
      showError(password, 'Al menos 8 caracteres, combinar letras y números.')
      return false
    }
    return true
  }

  function validateConfirmPassword() {
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
      showError(confirmPassword, 'Las contraseñas deben coincidir.')
      return false
    }
    return true
  }

  function validateEdad() {
    const value = parseInt(edad.value, 10)
    if (isNaN(value) || value < 18) {
      showError(edad, 'Debe ser un número entero mayor o igual a 18.')
      return false
    }
    return true
  }

  function validateTelefono() {
    const value = telefono.value.trim()
    const regex = /^\d{7,}$/
    if (!regex.test(value)) {
      showError(telefono, 'Debe tener al menos 7 dígitos y solo números (sin espacios).')
      return false
    }
    return true
  }

  function validateDireccion() {
    const value = direccion.value.trim()
    if (value.length < 5 || !value.includes(' ')) {
      showError(direccion, 'Debe tener al menos 5 caracteres y contener un espacio.')
      return false
    }
    return true
  }

  function validateCiudad() {
    const value = ciudad.value.trim()
    if (value.length < 3) {
      showError(ciudad, 'Debe tener al menos 3 caracteres.')
      return false
    }
    return true
  }

  function validateCodigoPostal() {
    const value = codigoPostal.value.trim()
    if (value.length < 3) {
      showError(codigoPostal, 'Debe tener al menos 3 caracteres.')
      return false
    }
    return true
  }

  function validateDni() {
    const value = dni.value.trim()
    const regex = /^\d{7,8}$/
    if (!regex.test(value)) {
      showError(dni, 'Debe ser un número de 7 u 8 dígitos.')
      return false
    }
    return true
  }

  fields.forEach(({ el, validator }) => {
    el.addEventListener('blur', validator)
    el.addEventListener('focus', () => clearError(el))
  })

  nombre.addEventListener('keydown', () => {
    setTimeout(updateTitle, 0)
  })
  nombre.addEventListener('focus', updateTitle)

  function openModal(texto) {
    modalTexto.innerText = texto
    modal.style.display = 'flex'
  }

  function closeModal() {
    modal.style.display = 'none'
    modalTexto.innerText = ''
  }

  modalClose.addEventListener('click', closeModal)

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal()
    }
  })

  form.addEventListener('submit', function(e) {
    e.preventDefault()
    fields.forEach(({ el }) => clearError(el))
    const results = fields.map(({ validator }) => validator())
    const allValid = results.every(v => v)
    if (allValid) {
      const data =
        `––– Suscripción Exitosa –––\n\n` +
        `Nombre completo: ${nombre.value.trim()}\n` +
        `Email: ${email.value.trim()}\n` +
        `Edad: ${edad.value.trim()}\n` +
        `Teléfono: ${telefono.value.trim()}\n` +
        `Dirección: ${direccion.value.trim()}\n` +
        `Ciudad: ${ciudad.value.trim()}\n` +
        `Código Postal: ${codigoPostal.value.trim()}\n` +
        `DNI: ${dni.value.trim()}\n\n` +
        `¡Gracias por suscribirte! 🥳`
      openModal(data)
      form.reset()
      updateTitle()
    } else {
      let mensajes = '––– Errores de Validación –––\n\n'
      fields.forEach(({ el }) => {
        const errEl = document.getElementById(`${el.id}Error`)
        if (errEl && errEl.textContent) {
          mensajes += `• ${errEl.textContent}\n`
        }
      })
      mensajes += '\nPor favor, corrige los campos indicados.'
      openModal(mensajes)
    }
  })
})
