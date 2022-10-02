// Основные модули ==========================================
import * as flsFunctions from './functions.js'

// *** Работа с формами ***
const forms = document.querySelectorAll('.form')
const dataValue = document.querySelectorAll('[data-value]')

// Заполняю плейсхолдер формы с data-value
if (dataValue.length > 0) {
  for (let item of dataValue) {
    item.placeholder = item.dataset.value
  }
}

// Навешую слушателей на формы

if (forms.length > 0) {
  for (let form of forms) {
    form.addEventListener('submit', formSend)
  }
}

// *** Отправляет форму, добавить async перед функцией ***
function formSend(e) {
  e.preventDefault()
  const targetElement = e.target

  // делаю валидацию

  let error = 0
  let formData
  if (forms.length > 0) {
    for (let form of forms) {
      form.classList.remove('submit')
      targetElement.classList.add('submit')

      error += formValidate(form)
      // получаю данные с полей формы
      formData = new FormData(form)
    }
  }

  // formData.append('image', formImage.files[0])

  if (error === 0) {
    // удаляю спаны с текстом ошибки
    removeErrorElement()
    // клас для лоадера
    // form.classList.add('_sending')
    // let response = await fetch('sendmail.php', {
    //   method: 'POST',
    //   body: formData,
    // })
    // //отправляю форму
    // if (response.ok) {
    //   let result = await response.json()
    //   alert(result.message)
    //   formPreview.innerHTML = ''
    //   form.reset()
    //   form.classList.remove('_sending')
    // } else {
    //   alert('Ошибка')
    //   form.classList.remove('_sending')
    // }
    // Временно вывожу попап
    const popupMessage = document.querySelector('.popup_subscribe-message')
    popupMessage.classList.add('open')
  } else {
    // alert('Заполните обязательные поля')

    const errorElement = flsFunctions.element(
      'span',
      ['form__error'],
      'Помилка'
    )

    const formError = document.querySelector('.form._error')

    // удаляю спаны с текстом ошибки
    removeErrorElement()

    formError.append(errorElement)
  }
}

// *** валидирует формы ***
/**
 *
 * @param {Element} form
 * @returns {Number}
 */
function formValidate(form) {
  let error = 0
  let formReq = document.querySelectorAll('._reg')

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index]
    formRemoveError(input)

    // валидирую только нажатую форму
    if (form.classList.contains('submit')) {
      if (input.classList.contains('_email')) {
        //Проверка регуляркой емейл
        if (emailTest(input)) {
          formAddError(input)
          error++
        }
      } else if (
        input.getAttribute('type') === 'checkbox' &&
        input.checked === false
      ) {
        // Проверка на нажатий чекбокс
        formAddError(input)
        error++
      } else {
        // Проверка на пустое поле
        if (input.value === '') {
          formAddError(input)
          error++
        }
      }
    }
  }
  return error
}

// *** Добавляет и удаляет класс _error у формы и инпута ***
function formAddError(input) {
  input.closest('.form').classList.add('_error')
  input.classList.add('_error')
}

function formRemoveError(input) {
  input.closest('.form').classList.remove('_error')
  input.classList.remove('_error')
}

// *** Функция теста email ***
/**
 *
 * @param {Element} input
 * @returns {String}
 */
function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

// *** Функция удаляет нод элемент с текстом ошибки
function removeErrorElement() {
  const errorElementAll = document.querySelectorAll('.form__error')

  if (errorElementAll.length > 0) {
    for (let el of errorElementAll) {
      el.remove()
    }
  }
}
