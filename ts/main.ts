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
// let myBook = new Book();
// myBook.isbn = "123";
// myBook.price = 9.99;
// myBook.title = "Programming for Beginners";
// myBook.releaseDate = new Date(2023, 9, 8); //months start at index 0

// console.log(myBook);

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
    clearAllErroMessages();

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

    //Validate title
    let title:string = titleTextBox.value;
    if(title.trim() == ""){
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must provide a title";
    }

    //Validate price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number"
    }

    //Validate release date
    let releaseDate = releaseDateTextBox.value;
    let releaseDateCheck = Date.parse(releaseDate); //If invalid, this will return NaN
    if (isNaN(releaseDateCheck)){
        isValidData = false;
        releaseDateTextBox.nextElementSibling.textContent = "Release date must be a valid date"
    }

    if (isValidData){
        //Create and populate Book pbject if all data is valid
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;

        //The value of the <input type = "date"> is off by one day because of timezone issues
        //This solution resolves the timeZone issues.
        //Split date string into an array "2023- 10- 24"
        //Result would be {"2023", "10", "24"}
        const dateParts = releaseDate.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; //subtract 1 because months are index based 
        const day = parseInt(dateParts[2]);
        const correctDate = new Date(year, month, day);

        addedBook.releaseDate = correctDate;

        return addedBook;
    }
    return null; //Return null if any invalid data is present
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
 * Adds a book object to web and web storage. Assumes
 * all data is valid
 * @param b The Book contains valid data to be added
 */
function addBook(b:Book):void {
    // alert("Data was valid, book added");
    console.log(b);

    //add the book to the webpage
    let bookDiv: HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = b.title + ":" + b.isbn; //`${b.title} : ${b.isbn}`; non concatenation
    
    //add h2 to book div <div><h2>Title : ISBN</h2></div>
    bookDiv.appendChild(titleHeading); 

    //add bookDiv to webpage
    let bookListDisplay = document.querySelector("#book-display");
    bookListDisplay.appendChild(bookDiv); //add the newly created book
    
    // same ^^ document.querySelector("#book-display").appendChild(bookDiv);
    //string version document.querySelector("#book-display").innerHTML += `<div><h2>${b.title}:${b.isbn}</h2></div>`;
    
    let bookDescription:HTMLParagraphElement = document.createElement("p");
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    })

    let formattedPrice = currencyFormatter.format(b.price);

    bookDescription.textContent = `Book was released on ${b.releaseDate} and costs ${formattedPrice}`;
    bookDiv.appendChild(bookDescription);
}

/**
 * Clears all the validation error messages spans
 * in the form
 */
function clearAllErroMessages(){
    //Get all error spans
    let allSpans = document.querySelectorAll("span.error-msg");

    //Loop through, set each span to an empty string
    //allSpans.forEach(span => span.textContent = "");
    for (let i = 0; i < allSpans.length; i++) {
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";
    }
}