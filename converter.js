const fs = require('fs')

// CAMINHO DO ARQUIVO ORIGINAL
const bible = require('./pt_acf.json')

// Criar pasta data se não existir
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data')
}

bible.forEach(book => {
  const formattedBook = {}

  book.chapters.forEach((chapter, chapterIndex) => {
    const chapterNumber = chapterIndex + 1
    formattedBook[chapterNumber] = {}

    chapter.forEach((verseText, verseIndex) => {
      const verseNumber = verseIndex + 1
      formattedBook[chapterNumber][verseNumber] = verseText
    })
  })

  const fileName = book.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")

  fs.writeFileSync(
    `./data/${fileName}.json`,
    JSON.stringify(formattedBook, null, 2)
  )

  console.log(`✔ ${fileName}.json criado`)
})

console.log('Conversão finalizada 🚀')