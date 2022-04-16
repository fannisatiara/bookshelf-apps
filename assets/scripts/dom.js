const UNCOMPLETED_READ_BOOK_ID = "incompleteBookShelfList";
const COMPLETED_READ_BOOK_ID = "completeBookShelfList";
const BOOK_ID = "bookId";

function makeBookList(titleBook, authorBook, yearBook, timeBook, isComplete){
    const bookTitle = document.createElement("h3");
    const title = document.createElement("span");
    title.classList.add("book_title");
    title.innerText = titleBook;
    bookTitle.append(title);

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = "Penulis : ";
    const author = document.createElement("span");
    author.classList.add("book_author");
    author.innerText = authorBook;
    bookAuthor.append(author);

    const bookYear = document.createElement("p");
    bookYear.innerText = "Tahun Terbit : ";
    const year = document.createElement("span");
    year.classList.add("book_year");
    year.innerText = yearBook;
    bookYear.append(year);

    const bookTime = document.createElement("p");
    bookTime.innerText = "Target Selesai : ";
    const time = document.createElement("span");
    time.classList.add("book_time");
    time.innerText = timeBook;
    bookTime.append(time);

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("info");
    bookInfo.append(bookTitle, bookAuthor, bookYear, bookTime);

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookInfo, bookAction);

    if (isComplete) {
        bookAction.append(
            createUndoButton(),
            createDeleteButton()
        );
    } else {
        bookAction.append(
            createCheckButton(),
            createDeleteButton()
        );
    }
    return container;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });   
    return button;
}

function createCheckButton() {
    return createButton("checklist", function(event) {
        const parent = event.target.parentElement;
        addBookToCompleted(parent.parentElement);
    });
}

function createDeleteButton() {
    return createButton("delete", function(event) {
        const parent = event.target.parentElement;
        removeBook(parent.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo", function(event) {
        const parent = event.target.parentElement;
        undoBookFromCompleted(parent.parentElement);
    });
}

function addBook() {
    const incompleteBookShelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
    const completeBookShelfList = document.getElementById(COMPLETED_READ_BOOK_ID);
    const checkType = document.getElementById("inputBookIsComplete");
    
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookTime = document.getElementById("inputBookTime").value;
    
    if (!checkType.checked) {
        const book = makeBookList(bookTitle, bookAuthor, bookYear, bookTime, false);
        const bookObject = makeBookObject(bookTitle, bookAuthor, bookYear, bookTime, false);
        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);
        incompleteBookShelfList.append(book);
    } else {
        const book = makeBookList(bookTitle, bookAuthor, bookYear, bookTime, true);
        const bookObject = makeBookObject(bookTitle, bookAuthor, bookYear, bookTime, true);
        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);
        completeBookShelfList.append(book);
    }
    updateDataToStorage();
}

function addBookToCompleted(bookElement) {  
    const bookTitle = bookElement.querySelector(".book_title").innerText;
    const bookAuthor = bookElement.querySelector(".book_author").innerText;
    const bookYear = bookElement.querySelector(".book_year").innerText;
    const bookTime = bookElement.querySelector(".book_time").innerText;

    const newBook = makeBookList(bookTitle, bookAuthor, bookYear, bookTime, true);
    const completeBookShelfList = document.getElementById(COMPLETED_READ_BOOK_ID);
    const book = findBook(bookElement[BOOK_ID]);
    book.isComplete = true;
    newBook[BOOK_ID] = book.id;
    completeBookShelfList.append(newBook);
    bookElement.remove();   
    updateDataToStorage();
}

function removeBook(bookElement) {
    const isDelete = window.confirm("Apakah anda yakin untuk menghapus data ini?");
    if (isDelete) {
        const bookPosition = findBookIndex(bookElement[BOOK_ID]);
        books.splice(bookPosition, 1);
        bookElement.remove();
        updateDataToStorage();
        alert("Data berhasil dihapus");
    } else {
        alert("data gagal dihapus");
    }
}

function undoBookFromCompleted(bookElement) {
    const incompleteBookShelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_title").innerText;
    const bookAuthor = bookElement.querySelector(".book_author").innerText;
    const bookYear = bookElement.querySelector(".book_year").innerText;
    const bookTime = bookElement.querySelector(".book_time").innerText;
    const newBook = makeBookList(bookTitle, bookAuthor, bookYear, bookTime, false);
    const book = findBook(bookElement[BOOK_ID]);
    book.isComplete = false;
    newBook[BOOK_ID] = book.id;
    incompleteBookShelfList.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function deleteForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookTime").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
}