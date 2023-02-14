 const versesContainer = document.querySelector('#verses-container')
 const bookNameBible = document.querySelector('#book-name')
 const chapterBibleNumber = document.querySelector('#chapter')
 const formSearch = document.querySelector('[data-js="form-search"]') 
 const clearButton = document.querySelector('[data-js="clear-button"]')
 const backToTopButton = document.querySelector('[data-js="back-to-top-button"]')

 const getUrl = (bookName, chapter) => `https://www.abibliadigital.com.br/api/verses/ra/${bookName}/${chapter}`

 const fetchBook = async (bookName, chapter) => {
  try{
    const response = await fetch(getUrl(bookName, chapter))
    
    if(!response.ok){
      throw new Error('Não foi possível obter os dados.')
    }
    
    const bookData = await response.json()
    return bookData
  } catch(error){
    alert(error.message)
  }
 }
 
formSearch.addEventListener('submit', async e => {
  e.preventDefault()
  
  const inputBookValue = e.target.book.value
  const inputChapterValue = e.target.chapter.value
  
  const { book, chapter, verses } = await fetchBook(inputBookValue, inputChapterValue)

   const versesTemplate = verses.map(item => `
     <p><span>${item.number}</span>${item.text}</p>
     `).join('')
   
   bookNameBible.textContent = book.name
   chapterBibleNumber.textContent = `${chapter.number}`
   versesContainer.innerHTML +=  versesTemplate

   clearButton.classList.remove('hidden')
   clearButton.classList.add('show')
   
   formSearch.reset()
   e.target.book.focus()
})

clearButton.addEventListener('click', () => {
  bookNameBible.textContent = ''
  chapterBibleNumber.textContent = ''
  versesContainer.textContent = ''
  clearButton.classList.add('hidden')  
})

