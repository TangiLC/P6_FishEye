// DOM Elements
const main = document.getElementById('main')
const footer = document.getElementById('footer')
const header = document.getElementById('header')
const modal = document.getElementById('contact_modal')
const toHide = document.querySelectorAll('.toHide')
const success = document.querySelectorAll('.formSuccessMessage')
const modalBtn = document.querySelectorAll('.contact_button')
const closeBtn = document.querySelector('.btn-close')
const form = document.querySelector('form')
const formData = document.querySelectorAll('.formData')
const formDataToValidate = document.querySelectorAll(
  '.formData[data-validation-type]'
)
const formSuccessMsg = document.getElementById('formSuccessMessage')

// add all the elements inside modal which you want to make focusable
const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements)
const lastFocusableElement = focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

document.addEventListener('keydown', function (e) {
  let isTabPressed = e.key === 'Tab' || e.keydown === 9

  if (!isTabPressed) {
    return
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus() // add focus for the last focusable element
      e.preventDefault()
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last element then focus 1st element after pressing tab
      firstFocusableElement.focus() // add focus for the first focusable element
      e.preventDefault()
    }
  }
})

function displayModal () {
  modal.style.display = 'block'
  main.style.display = 'none'
  footer.style.display = 'none'
  header.style.display = 'none'
  firstFocusableElement.focus({ focusVisible: true })
}

function closeModal () {
  modal.style.display = 'none'
  main.style.display = 'block'
  footer.style.display = 'block'
  header.style.display = 'block'
  
}

function resetThenCloseModal () {
  setTimeout(form.reset(), 2000)
  location.reload()
  closeModal()
}

function closeValidModal () {
  closeBtn.style.display = 'block'
  let firstN = document.getElementById('first').value
  let lastN = document.getElementById('last').value
  let emailN = document.getElementById('email').value
  let msgN = document.getElementById('message').value

  setTimeout(
    console.log(firstN + ', ' + lastN + ', ' + emailN + ', ' + msgN),
    800
  )
  formSuccessMsg.innerHTML =
    'Merci de votre message, ' +
    firstN.charAt(0).toUpperCase() +
    firstN.slice(1).toLowerCase() +
    '.'
  closeModal()
  displayModal()
  closeBtn.focus({ focusVisible: true })
}

// Regex pour les tests input
let validName = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]{2,}$/
let validEmail = /^[a-z0-9._-]+@[a-z0-9]{1,}[a-z0-9.-]{1,62}\.[a-z]{2,4}$/
let validMsg = /^[A-Za-z0-9À-ÖØ-öø-ÿ '-.,;?!()€$%:<>]{10,}$/

// Validation unitaire booléen de l'array element(input)/attribut (value) comparaison avec le regex
const validate = {
  name: ({ value }) => validName.test(value),
  email: ({ value }) => validEmail.test(value.toLowerCase()),
  message: ({ value }) => validMsg.test(value)
}

//fonction de validation en arrière plan avec affichage du message d'erreur si invalide
formDataToValidate.forEach(elem => {
  elem.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', e => {
      const isValid = validate[elem.getAttribute('data-validation-type')]({
        value: e.target.value,
        elem
      })
      elem.setAttribute('data-error-visible', !isValid);

    })
      
  })
})

//Validation finale de l'ensemble du formulaire au clique submit
function validateWholeForm () {
  formDataToValidate.forEach(elem => {
    elem.querySelectorAll('input').forEach(input => {
      const isValid = validate[elem.getAttribute('data-validation-type')]({
        value: input.value,
        elem
      })
      elem.setAttribute('data-error-visible', !isValid);
      elem.firstElementChild.nextElementSibling.setAttribute('aria-invalid',!isValid);
      if(elem.getAttribute('data-error-visible')=='true'){
        elem.firstElementChild.nextElementSibling.focus({focusVisible:true})}
    })
  })

  const isFormValid = [...formDataToValidate].every(
    elem =>
      elem.getAttribute('data-error-visible') === 'false' ||
      !elem.hasAttribute('data-error-visible')
  )

  return isFormValid
}

//fonction d'attente
function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
// lancer l'animation css formfail contenue dans la class puis restauration à l'état antérieur
async function formFail () {
  form.classList.toggle('formFail')
  await delay(2000)
  form.classList.toggle('formFail')
}
// fonction au submit : conserver les input et lancer la validation,
// afficher le message formsuccess et bouton fermer si validation true
// lancer formfail si validation false
form.addEventListener('submit', e => {
  e.preventDefault()
  if (validateWholeForm()) {
    form.classList.add('formSuccess')
    setTimeout(closeValidModal, 200)
  } else {
    formFail()
  }
})
