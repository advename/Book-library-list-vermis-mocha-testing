let removeButton; //Used to remove books

// ###########################
// GET CURRENT BOOKS
// ###########################
const table = document.querySelector("table");

fetch("/get-books").then(result => result.json()).then(data => displayBooks(data));

function displayBooks(data) {
    data.books.forEach(item => {
        addBookToTable(item);
    })
    console.log(data);
    updateRemoveButtons();

}

// ###########################
// ADDING NEW BOOKS
// ###########################
const submit = document.querySelector("form input[type='submit']");
const message = document.querySelector(".message");

submit.addEventListener("click", addBook);

function addBook() {
    const inputs = document.querySelectorAll("input");
    console.log(inputs[0].value);
    let newBook = {
        author: inputs[0].value,
        title: inputs[1].value,
        publisher: inputs[2].value,
        language: inputs[3].value,
        pages: inputs[4].value,
        year: inputs[5].value
    }
    fetch("/admin/add-book", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    }).then(result => result.json()).then(result => checkAddStatus(result,newBook, inputs));
}

function checkAddStatus(result,newBook, inputs) {
    if (result.status === true) {
        addBookToTable(newBook);
        message.innerHTML = "Book added &#x2713;";
        message.style.opacity = "1";
        setTimeout(function () {
            message.style.removeProperty("opacity");
        }, 3000)
        updateRemoveButtons();
        inputs.forEach(input =>{
            input.value = "";
        })
    } else {
        message.innerHTML = "Error, book not saved";
        message.style.opacity = "1";
        setTimeout(function () {
            message.style.removeProperty("opacity");
        }, 3000)
    }
};



// ###########################
// REMOVE CURRENT BOOK
// ###########################

function updateRemoveButtons() {
    removeButton = document.querySelectorAll(".remove-book");
    removeButton.forEach(book => {
        book.addEventListener("click", removeBook);
    })
}

function removeBook() {
    let element = this.parentElement.className;
    let removeBook = {
        id: element
    };

    fetch("/admin/remove-book", {
        method: "DELETE",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(removeBook)
    }).then(result => result.json()).then(result => checkRemoveStatus(result, element));
}

function checkRemoveStatus(result, element) {
    console.log(result);
    if (result.status === true) {
        removeElementsByClass(element);
    } else {

    }
};


// ###########################
// ASSETS
// ###########################
function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addBookToTable(item) {
    let tree = document.createElement("tr");

    let author = document.createElement("td");
    author.textContent = item.author;
    let title = document.createElement("td");
    title.textContent = item.title;
    let publisher = document.createElement("td");
    publisher.textContent = item.publisher;
    let language = document.createElement("td");
    language.textContent = item.language;
    let pages = document.createElement("td");
    pages.textContent = item.pages;
    let year = document.createElement("td");
    year.textContent = item.year;

    tree.appendChild(author);
    tree.appendChild(title);
    tree.appendChild(publisher);
    tree.appendChild(language);
    tree.appendChild(pages);
    tree.appendChild(year);
    tree.innerHTML += "<td class='remove-book'>remove</td>";
    tree.className = item._id;
    table.appendChild(tree);
}


// ###########################
// LOGOUT
// ###########################
