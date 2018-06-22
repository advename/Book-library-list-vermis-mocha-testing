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
    tree.className = item._id;
    table.appendChild(tree);
}