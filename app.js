//'https://www.abibliadigital.com.br/api/verses/ra/sl/23'

 const versesContainer = document.querySelector('#verses-container')
 const bookNameBible = document.querySelector('#book-name')
 const chapterBibleNumber = document.querySelector('#chapter')

 const getBook = async (bookName, chapter) => {
   const response = await fetch(`https://www.abibliadigital.com.br/api/verses/ra/${bookName}/${chapter}`)
   return await response.json()
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

 addVersesIntoDOM('lc', '1')
