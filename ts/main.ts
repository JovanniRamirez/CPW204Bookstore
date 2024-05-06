/**
 * Represents an individual book that can be purchased
 */
class Book {
    /**
     * The 13 digit isbn number
     */
    isbn : string;

    /**
     * The title of the book
     */
    title : string;

    /**
     * The retail price of the book
     */
    price : number;

    /**
     * The date the book was first published. This could 
     * be a future date, if the book is not yet released.
     */
    releaseDate : Date;
}

// Book object test code
let myBook = new Book();
myBook.isbn = "123";
myBook.price = 9.99;
myBook.title = "Programming for Beginners";
myBook.releaseDate = new Date(2023, 9, 8); //months start at index 0

console.log(myBook);

window.onload = function() {
    // Set up button click for add book form
    let addBookButton = document.querySelector("#add-book") as HTMLButtonElement;
    addBookButton.onclick = processBook;
}

function processBook() {
    console.log("process book was called");

    let userBook = getBook();
    if (userBook != null){
        addBook(userBook);
    }
}

/**
 * 
 * @returns This function will retrieve all the book
 * data from the HTML page. If all data is valid
 * a Book object will be returned. If any data
 * is invalid, null will be returned and error messages
 * will be shown on the webpage.
 */
function getBook():Book {
    //Get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;
    
    //Validate data
    let isValidData = true;

    //Validate ISBN
    let isbn:string = isbnTextBox.value;
    if (!isValidISBN(isbn)){
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";
    }

    
}

/**
 * This validates an ISBN 13 number. Returns true if the isbn only consists of 13 digit characters
 * @param data The string to be validated
 * @returns True if data is a valid ISBN 13
 */
function isValidISBN(data:string) {
    //let regex = /^(?=(?:\D*\d){13}$)\d{1,5}\-?\d{1,7}\-?\d{1,6}\-?\d{1}$/;
    let regex = /^\d{13}$/;
    return regex.test(data);
}

/**
 * Adds a book object to web storage. Assumes
 * all data is valid
 * @param b The Book contains valid data to be added
 */
function addBook(b:Book):void {

}