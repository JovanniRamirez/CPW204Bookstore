class Book {
}
let myBook = new Book();
myBook.isbn = "123";
myBook.price = 9.99;
myBook.title = "Programming for Beginners";
myBook.releaseDate = new Date(2023, 9, 8);
console.log(myBook);
window.onload = function () {
    let addBookButton = document.querySelector("#add-book");
    addBookButton.onclick = processBook;
};
function processBook() {
    console.log("process book was called");
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
function getBook() {
    return null;
}
function addBook(b) {
}
