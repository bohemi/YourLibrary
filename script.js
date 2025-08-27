const dialog = document.querySelector("dialog");
const openDialogueButton = document.querySelector("#openDialogueButton");
const confirmDialogueButton = document.querySelector("#confirmDialogueButton");
const closeDialogueButton = document.querySelector("#closeDialogueButton");
const flexContainer = document.querySelector("#formContainer");
booksContainer = [];

// dialog section
openDialogueButton.addEventListener("click", () => {
  flexContainer.style.display = "grid";
  dialog.showModal();
})
confirmDialogueButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.querySelector("#bookNameInput").value === "" ||
    document.querySelector("#authorNameInput").value === "" ||
    document.querySelector("#bookPagesInput").value === "") {
      console.log("Please fill all the fields");
    return;
  }
  // fill the booksContainer array
  addBooksToLibrary(document.querySelector("#bookNameInput").value,
    document.querySelector("#authorNameInput").value,
    document.querySelector("#bookPagesInput").value);

  flexContainer.style.display = "none";
  dialog.close("working");
})
closeDialogueButton.addEventListener("click", (e) => {
  flexContainer.style.display = "none";
  dialog.close("working");
})
dialog.addEventListener("close", () => {
  console.log(`${dialog.returnValue}`);
})

function Book(bookName, author, pages) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.bookName = bookName;
  this.author = author;
  this.pages = pages;
}

function addBooksToLibrary(bookName, author, pages) {
  const book = new Book(bookName, author, pages);
  booksContainer.push(book);
  console.log(booksContainer[0].pages);

}
// CSS section
function createBookCard(book) {
  
}