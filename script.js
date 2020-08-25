class Calculator {
  constructor(ilkislemTextElement, islemTextElement) {
    this.ilkislemTextElement = ilkislemTextElement
    this.islemTextElement = islemTextElement
    this.clear()
  }

  clear() {
    this.islem = ''
    this.ilkislem = ''
    this.operation = undefined
  }

  del() {
    this.islem = this.islem.toString().slice(0, -1)
  }

  numEkle(number) {
    if (number === '.' && this.islem.includes('.')) return
    this.islem = this.islem.toString() + number.toString()
  }

  islemSecme(operation) {
    if (this.islem === '') return
    if (this.ilkislem !== '') {
      this.hesap()
    }
    this.operation = operation
    this.ilkislem = this.islem
    this.islem = ''
  }

  hesap() {
    let computation
    const prev = parseFloat(this.ilkislem)
    const current = parseFloat(this.islem)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.islem = computation
    this.operation = undefined
    this.ilkislem = ''
  }

  Numgöster(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  Numyenile() {
    this.islemTextElement.innerText =
      this.Numgöster(this.islem)
    if (this.operation != null) {
      this.ilkislemTextElement.innerText =
        `${this.Numgöster(this.ilkislem)} ${this.operation}`
    } else {
      this.ilkislemTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-all-clear]')
const ilkislemTextElement = document.querySelector('[data-ilk-islem]')
const islemTextElement = document.querySelector('[data-mevcut-islem]')

const calculator = new Calculator(ilkislemTextElement, islemTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.numEkle(button.innerText)
    calculator.Numyenile()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.islemSecme(button.innerText)
    calculator.Numyenile()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.hesap()
  calculator.Numyenile()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.Numyenile()
})

deleteButton.addEventListener('click', button => {
  calculator.del()
  calculator.Numyenile()
})