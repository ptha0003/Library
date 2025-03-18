const myLibrary = [];
const tBody = document.querySelector("tbody");
const addBook = document.getElementById("addBtn");
const addBookDialog = document.getElementById("addBookDialog");
const close = document.getElementById("closeDialog");
const table = document.querySelector("table");

function Book(uuid, title, author, pages, haveRead) {
    if (!new.target) {
        throw Error("No 'new' keyword was used to call this obj");
    }
    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.updateHaveRead = function (){
    this.haveRead = !this.haveRead;
}

table.addEventListener("click", e=>{
    if(e.target.type == undefined || e.target.type == "checkbox"){
        for(i=0;i<myLibrary.length;i++){
            if(myLibrary[i].uuid == e.target.value){
                myLibrary[i].updateHaveRead();
                updateTable();
            }
        }
    }
})


function addBookToLibrary(title, author, pages, haveRead) {
    if (title == "" || author == "" || pages == "" || haveRead == "") {
        console.log("Nothing has been entered");
        return;
    }
    let uuid = crypto.randomUUID();
    const newBook = new Book(uuid, title, author, pages, haveRead);
    myLibrary.push(newBook);
    updateTable();
}

function updateTable() {
    tBody.innerHTML = "";
    
    for(i=0;i<myLibrary.length;i++){
        let checkedRow = ""
        if (myLibrary[i].haveRead.toString() == "true") checkedRow = `<td><input type="checkbox" value=${myLibrary[i].uuid} checked></td>`
        else checkedRow = `<td><input type="checkbox" value=${myLibrary[i].uuid}></td>`
        tBody.innerHTML += `
        <tr id=${myLibrary[i].uuid}>
            <td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            ${checkedRow}
            <td><button class="btnDelete" value=${myLibrary[i].uuid}>Delete</button></td>
        </tr>`
    }
}

function addUserInputToTable(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let numPages = document.getElementById("page").value;
    let haveRead = (document.getElementById("haveRead").checked).toString();

    addBookToLibrary(title,author,numPages,haveRead);
    addBookDialog.close();
}

table.addEventListener("click", e=>{
    if(e.target.type == "submit"){
        for (i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].uuid == e.target.value) {
                myLibrary.splice(i, 1);
            }
        }
        updateTable();
    }
})

addBook.addEventListener("click", ()=>{
    addBookDialog.showModal();
})

close.addEventListener("click",()=>{
    addBookDialog.close();
})
