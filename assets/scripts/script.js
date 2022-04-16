document.addEventListener("DOMContentLoaded", function() {
    const submitForm = document.getElementById("bookSubmit");
    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        addBook();
        deleteForm();
    });

    if (checkForStorage()) {
        loadDataFromStorage();
    }
});

const searchValue = document.querySelector("#searchBookTitle");
const btnSearch = document.querySelector("#searchSubmit");

document.addEventListener("ondatasaved", () => {
    console.log("Buku berhasil disimpan.");
  });
  
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

const checkType = document.getElementById("inputBookIsComplete");
checkType.addEventListener("click", () => {
    if (checkType.checked) {
        document.getElementById("bookType").innerHTML = "<strong>Selesai Dibaca</strong>";
    } else {
        document.getElementById("bookType").innerHTML = "<strong>Belum Dibaca</strong>";
    }
});