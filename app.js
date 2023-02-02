//'https://www.abibliadigital.com.br/api/verses/ra/sl/23'

 const versesContainer = document.querySelector('#verses-container')
 const bookNameBible = document.querySelector('#book-name')
 const chapterBibleNumber = document.querySelector('#chapter')
 const formSearch = document.querySelector('[data-js="form-search"]') 

 const getBook = async (bookName, chapter) => {
  try{
    const response = await fetch(`https://www.abibliadigital.com.br/api/verses/ra/${bookName}/${chapter}`)
    
    if(!response.ok){
      throw new Error('Não foi possível obter os dados.')
    }
    
    return response.json()
  } catch(error){
    alert(error.message)
  }
 }

 const addVersesIntoDOM = async (bookName, chapterNumber) => {
   const { book, chapter, verses } = await getBook(bookName, chapterNumber)
   const arrayVerses = verses
   const versesTemplate = arrayVerses
       .map(item =>
         `<p><span>${item.number} </span>${item.text}</p>`).join('')
         
         bookNameBible.textContent = book.name
         chapterBibleNumber.textContent = `Capítulo ${chapter.number}`
         versesContainer.innerHTML += versesTemplate
 }
 
  formSearch.addEventListener('submit', event => {
    event.preventDefault()

    const inputBookValue = event.target.book.value
    const inputChapterValue = event.target.chapter.value
    
    addVersesIntoDOM(inputBookValue, inputChapterValue)
 
    formSearch.reset()
    event.target.book.focus() 
  })
