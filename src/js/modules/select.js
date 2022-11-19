const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder по умолчанию'

  const items = data.map((item) => {
    let cls = ''

    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
          <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
      `
  })

  return `
       <div class="select__backdrop" data-type="backdrop"></div>
       <div class="select__input" data-type="input"> <span data-type="value">${text}</span> <i data-type="arrow" class="fa-solid fa-chevron-down"></i></div>
          <div class="select__dropdown">
              <ul class="select__list">
                  ${items.join('')}
              </ul>
          </div>
  `
}

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

     if (this.$el) {
      this.#render()
      this.#setup()
      // getFontAwesome()
    }
    
  }

  // сделал метод работы с шаблонами приватным
  #render() {
    const { placeholder, data } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }

  // приватный метод работы с настройками
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  // геттер
  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId)
  }

  // заполняет инпут данными при клике
  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value

    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove('selected')
    })
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.current) : null

    this.close()
  }

  // если элемент открыт, закрывает и наоборот
  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
    // this.$arrow.classList.remove('fa-chevron-down')
    // this.$arrow.classList.add('fa-chevron-up')
  }

  close() {
    this.$el.classList.remove('open')
    // this.$arrow.classList.add('fa-chevron-down')
    // this.$arrow.classList.remove('fa-chevron-up')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}

const select = new Select('#select', {
  placeholder: 'Выбери пожалуйсто элемент',
  selectedId: '1',
  data: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Angular' },
    { id: '3', value: 'Vue' },
    { id: '4', value: 'React Native' },
    { id: '5', value: 'Next' },
    { id: '6', value: 'Nest' },
  ],
  onSelect(item) {
    // console.log('select item', item)
  },
})
