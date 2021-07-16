//Book class: Representing the book
class Book {
    constructor(name, author, status) {
        this.name = name
        this.author = author
        this.status = status
    }
}

//Design class: Handling the page tasks

class UI {
    static displayBooks() {
        const books = Store.getBooks()

        books.forEach((book) => UI.addBookToList(book))
        }

        static addBookToList(book) {
            const list = document.querySelector('#book-list')

            const row = document.createElement('tr')

            row.innerHTML = `
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td><button class= "d-btn">Delete</button></td>
            `

            list.appendChild(row)
        }

        static deleteBook(el) {
            if(el.classList.contains('d-btn')) {
                el.parentElement.parentElement.remove()
            }
        }

        static clearFields() {
            document.querySelector('#book').value = ''
            document.querySelector('#author').value = ''
        }
}

//Store class: for holding the books

class Store {
    static getBooks() {
        let books
        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books 
    }

    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))

    }
    static removeBook(name) {

        const books = Store.getBooks()

        books.forEach((book, index) => {
            if(book.name === name) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))

    }
}

//Event: Add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {

    //prevent actual submit

    e.preventDefault()

    //Get form values
    const name = document.querySelector('#book').value
    const author = document.querySelector('#author').value
    const status = document.querySelector('#status').value
  

    // Instatiate book
    const book = new Book(name, author, status)

    // Add book to UI
    UI.addBookToList(book)

    //Add book to store
    Store.addBook(book)

    // Clear fields
    UI.clearFields()
})

//Event: Display book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

document.querySelector('#book-list').addEventListener('click', (e) => {
    //Event: Remove book from UI
    UI.deleteBook(e.target)

    // Remove book from local store
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
})