const dialog = document.querySelector("dialog");
const openDialogueButton = document.querySelector("#openDialogueButton");
const confirmDialogueButton = document.querySelector("#confirmDialogueButton");
const closeDialogueButton = document.querySelector("#closeDialogueButton");
const formContainer = document.querySelector("#formContainer");
booksContainer = [];

// Calls
buttonBehaviour();

// function creation section
function buttonBehaviour() {
  openDialogueButton.addEventListener("click", () => {
    dialog.showModal();
    formContainer.style.display = "grid";
  });
  closeDialogueButton.addEventListener("click", (e) => {
    formContainer.style.display = "none";
    dialog.close();
  });

  confirmDialogueButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (emptyInputs()) {
      // fill the booksContainer array
      addBooksToLibrary(
        document.querySelector("#bookNameInput").value,
        document.querySelector("#authorNameInput").value,
        document.querySelector("#bookPagesInput").value
      );
      dialog.close();
      formContainer.style.display = "none";
    }
  });
}

function emptyInputs() {
  if (document.querySelector("#bookNameInput").value === "" ||
    document.querySelector("#authorNameInput").value === "" ||
    document.querySelector("#bookPagesInput").value === "") {
    console.log("Please fill all the fields");
    return false;
  }
  return true;
}

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
  // to avoid duplicate entries.. start checking when there are 2 entries now,
  // the second book with the same name will not appear because we are checking
  // the second entry after adding it to the array but before creating the book card.
  if (booksContainer.length >= 2 && booksContainer[booksContainer.length - 1]
    .bookName ===
    booksContainer[booksContainer.length - 2].bookName) {
    alert("This book is already in your library!");
    booksContainer.pop();
    return;
  }
  createBookCard(book);
}
// will be called inside the addBooksToLibrary function
function createBookCard(book) {
  const bookContainer = document.createElement("div");
  bookContainer.id = "bookContainer";

  const bookTitle = document.createElement("h2");
  bookTitle.textContent = "Title:";
  bookContainer.appendChild(bookTitle);
  const bookTitleName = document.createElement("p");
  bookTitleName.textContent = book.bookName;
  bookContainer.appendChild(bookTitleName);

  const bookAuthor = document.createElement("h2");
  bookAuthor.textContent = "Author:";
  bookContainer.appendChild(bookAuthor);
  const bookAuthorName = document.createElement("p");
  bookAuthorName.textContent = book.author;
  bookContainer.appendChild(bookAuthorName);

  const bookPages = document.createElement("h2");
  bookPages.textContent = "Pages:";
  bookContainer.appendChild(bookPages);
  const bookPagesNumbers = document.createElement("p");
  bookPagesNumbers.textContent = book.pages;
  bookContainer.appendChild(bookPagesNumbers);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = "readCheckbox";
  checkBox.checked = document.querySelector("#didRead").checked;
  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.htmlFor = "readCheckbox";
  checkBoxLabel.textContent = "Have you read this book?";
  bookContainer.appendChild(checkBoxLabel);
  bookContainer.appendChild(checkBox);

  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Remove Book";
  // creates a new array with the books except the one with matching id by filtering the id.
  // its removing the book by comparing every book from the original array and then it will eventually
  // come to the current book which is the book from the paranthesis and it will match and will be removed.
  removeBookButton.addEventListener("click", () => {
    booksContainer = booksContainer.filter((b) => b.id !== book.id);
    bookContainer.remove();
  });
  bookContainer.appendChild(removeBookButton);

  document.querySelector("body").appendChild(bookContainer);
}
