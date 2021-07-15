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
        const StoredBooks = [
            {
                name: 'Book One',
                author: 'John Doe',
                status: 'Read'
            },
            {
                name: 'Book Two',
                author: 'Jane Doe',
                status: 'Unread'
            }
        ]

        const books = StoredBooks

        books.forEach((book) => UI.addBookToList(book))
        }

        static addBookToList(book) {
            const list = document.querySelector('#book-list')

            const row = document.createElement('tr')

            row.innerHTML = `
                <td style="padding: 30px;">${book.name}</td>
                <td>${book.author}</td>
                <td>${book.status}</td>
                <td><a href="#" class="d-btn"><button>Delete</button</a></td>
            `

            list.appendChild(row)
        }

        static clearFields() {
            document.querySelector('#book').value = ''
            document.querySelector('#author').value = ''
        }
}

//Store class: for holding the books

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

    // Add bookto UI
    UI.addBookToList(book)

    // Clear fields
    UI.clearFields()
})

//Event: Display book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event: Remove book
