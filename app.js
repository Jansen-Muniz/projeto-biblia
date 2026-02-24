const versesContainer = document.querySelector('[data-js="verses"]')
const bookTitle = document.querySelector('[data-js="book-title"]')
const formSearchBook = document.querySelector('[data-js="form-search-book"]')
const inputBook = document.querySelector('[data-js="input-book"]')
const inputChapter = document.querySelector('[data-js="input-chapter"]')
const bookSelect = document.querySelector('[data-js="input-book"]')
const chapterSelect = document.querySelector('[data-js="input-chapter"]')

bookSelect.addEventListener('change', () => {
  const selectedBook = bookSelect.value

  if (!selectedBook) {
    chapterSelect.innerHTML = '<option value="">Selecione o capítulo</option>'
    chapterSelect.disabled = true
    return
  }

  loadChapters(selectedBook)
})

const loadChapters = async (book) => {
  chapterSelect.innerHTML = '<option value="">Carregando...</option>'
  chapterSelect.disabled = true

  try {
    const response = await fetch(`./data/${book}.json`)
    const bookData = await response.json()

    const chapters = Object.keys(bookData)

    chapterSelect.innerHTML = '<option value="">Selecione o capítulo</option>'

    chapters.forEach(chapter => {
      const option = document.createElement('option')
      option.value = chapter
      option.textContent = chapter
      chapterSelect.appendChild(option)
    })

    chapterSelect.disabled = false

  } catch (err) {
    chapterSelect.innerHTML = '<option value="">Erro ao carregar</option>'
  }
}

const formatBookName = (name) => {
  return name
    .replace(/(\d+)/, '$1 ')
    .replace(/(^\w|\s\w)/g, letter => letter.toUpperCase())
}

const loadBooks = async () => {
  const response = await fetch('./data/books.json')
  const books = await response.json()

  books.forEach(book => {
    const option = document.createElement('option')
    option.value = book
    option.textContent = formatBookName(book)
    bookSelect.appendChild(option)
  })
}

loadBooks()

const showError = (message) => {
  versesContainer.innerHTML = `
    <div class="verse-card">
      <strong>Erro:</strong> ${message}
    </div>
  `
}

const loadBook = async (book) => {
  try {
    const response = await fetch(`./data/${book}.json`)

    if (!response.ok) {
      throw new Error('Livro não encontrado.')
    }

    return await response.json()
  } catch (err) {
    showError(err.message)
    return null
  }
}

formSearchBook.addEventListener('submit', async (e) => {
  e.preventDefault()

  const book = bookSelect.value
  const chapter = chapterSelect.value

  if (!book || !chapter) {
    showError('Preencha livro e capítulo.')
    return
  }

  versesContainer.innerHTML = `<div class="verse-card">Carregando...</div>`

  const bookData = await loadBook(book)
  if (!bookData) return

  if (!bookData[chapter]) {
    showError('Capítulo não encontrado.')
    return
  }

  const verses = bookData[chapter]

  bookTitle.textContent = `${book.toUpperCase()} ${chapter}`

  versesContainer.innerHTML = Object.entries(verses)
    .map(([number, text]) => `
      <div class="verse-card">
        <span class="verse-number">${number}</span>
        ${text}
      </div>
    `)
    .join('')

  formSearchBook.reset()
  inputBook.focus()
})