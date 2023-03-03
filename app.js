 const versesContainer = document.querySelector('[data-js="verses-container"]')
 const bookNameBible = document.querySelector('[data-js="book-name"]')
 const chapterBibleNumber = document.querySelector('[data-js="chapter"]')
 const formSearchBook = document.querySelector('[data-js="form-search"]') 
 const inputBook = document.querySelector('[data-js="input-book"]')
 const inputChapter = document.querySelector('[data-js="input-chapter"]')
 const bookAuthor = document.querySelector('[data-js="book-author"]')
 const bookVersion = document.querySelector('[data-js="book-version"]')
 const bookGroup = document.querySelector('[data-js="book-group"]')

 const getUrl = (book, chapter) => `https://www.abibliadigital.com.br/api/verses/ra/${book}/${chapter}`

 const fetchBook = async url => {
    try{
      const response = await fetch(url)

      if(!response.ok){
        throw new Error('Não foi possível obter as informações')
      }

      const bookData = await response.json()
      return bookData
    }catch(err){
      alert(err.message)
    }
 }

 formSearchBook.addEventListener('submit', async e => {
    e.preventDefault()

    const {book, chapter, verses} = await fetchBook(getUrl(inputBook.value, inputChapter.value ))

    bookAuthor.textContent = `Autor: ${book.author}`
    bookVersion.textContent = `Versão: ${book.version}`
    bookGroup.textContent = `Grupo: ${book.group}`
    bookNameBible.textContent = book.name
    chapterBibleNumber.textContent = chapter.number
    
    versesContainer.innerHTML = verses
      .reduce((acc, {number, text}) => 
        `${acc}<p>${number} ${text}</p>`, '')
    
    e.target.reset()
    inputBook.focus()
})
