let myLibrary = [];
const tableBody = document.querySelector('tbody');
const submitBtn = document.querySelector('#submit-btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const status = document.querySelectorAll('.status');
const newBookBtn = document.querySelector('#new-book-btn');
const form = document.querySelector('form');


// The Constructor.
//function Book(title, author, pages, status) {
//    this.title = title;
//   this.author = author;
//    this.pages = pages;
//    this.status = status;
//}

// Class instead of the old Constructor.
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

submitBtn.addEventListener('click', addBookToLibrary);
function addBookToLibrary(event) {
    event.preventDefault();

    let currentStatus;
    for (let s of status){
        if (s.checked){
            currentStatus = s.value;
        }
    }
    let book = new Book(title.value, author.value, pages.value, currentStatus);
    myLibrary.push(book);
    displayBooks(myLibrary);
}


function displayBooks(anArray){
    // Remove whatever is initially displayed in the table.
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Add whatever is in myLibrary array to table.
    for(let i = 0; i < anArray.length; i++){
        let row = document.createElement('tr');

        let title = document.createElement('td');
        title.innerText = myLibrary[i].title;
        row.append(title);

        let author = document.createElement('td');
        author.innerText = myLibrary[i].author;
        row.append(author);

        let pages = document.createElement('td');
        pages.innerText = myLibrary[i].pages;
        row.append(pages);

        let status = document.createElement('td');
        status.innerText = myLibrary[i].status;
        row.append(status);

        let statusBtn = document.createElement('button');
        statusBtn.innerText = "Status";
        statusBtn.data = i;
        statusBtn.setAttribute('class', 'status-btn');
        statusBtn.addEventListener('click', updateStatus);
        row.append(statusBtn);

        let removeBtn = document.createElement('button');
        removeBtn.innerText = "-";
        removeBtn.data = i;
        removeBtn.setAttribute('class', 'remove-btn');
        removeBtn.addEventListener('click', removeBookFromLibrary);
        row.append(removeBtn);

        tableBody.append(row);
    }
}


function removeBookFromLibrary(event){
    myLibrary = myLibrary.slice(0, event.target.data).concat(myLibrary.slice(event.target.data + 1));
    displayBooks(myLibrary);
}

function updateStatus(event){
    myLibrary[event.target.data].status = "Read";
    displayBooks(myLibrary);
}

newBookBtn.addEventListener('click', function(){
    if (form.getAttribute('class') === "hidden"){
        form.removeAttribute('class');
    }
    else {
        form.setAttribute('class', 'hidden');
    }
});