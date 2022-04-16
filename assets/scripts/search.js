btnSearch.addEventListener("click",function(e) {
    e.preventDefault()
    if (localStorage.getItem(STORAGE_KEY) == "") {    
        alert("Data buku tidak ditemukan");
        return location.reload();
    }else{
        const searchBook = document.getElementById("searchBookTitle");
        const filter = searchBook.value.toLowerCase();
        const bookTitle = document.querySelectorAll("section.book_shelf>.book_list>.book_item");
        for (let i = 0; i < bookTitle.length; i++) {
        txtValue = bookTitle[i].textContent || bookTitle[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            bookTitle[i].style.display = "";
        } else {
            bookTitle[i].style.display = "none";
        }
    }
}
}) 