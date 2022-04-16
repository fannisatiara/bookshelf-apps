const STORAGE_KEY = "BOOKSHELF_STORAGE";

let books = [];

function checkForStorage(){
    if(typeof(Storage) === undefined) {
        alert("Browser anda tidak mendukung");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
    books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (checkForStorage())
        saveData();
}

function makeBookObject(title, author, year, time, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        time,
        isComplete
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId)
        return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;
        index++;
    }
    return -1;
}

function refreshDataFromBooks() {
    const incompleteBookShelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
    const completeBookShelfList = document.getElementById(COMPLETED_READ_BOOK_ID);

    for (book of books) {
        const newBook = makeBookList(book.title, book.author, book.year, book.time, book.isComplete);
        newBook[BOOK_ID] = book.id;

        if (book.isComplete) {
            completeBookShelfList.append(newBook);
        } else {
            incompleteBookShelfList.append(newBook);
        }
    }
}