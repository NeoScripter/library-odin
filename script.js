const myLibrary = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    editionYear: 1960,
    read: false
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    editionYear: 1949,
    read: false
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 432,
    editionYear: 1813,
    read: false
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 309,
    editionYear: 1997,
    read: false
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    editionYear: 1925,
    read: false
  }
];

let currentIndex = 0;

const primaryCard = document.getElementById('primary');

primaryCard.addEventListener('click', event => {
  const cardElement = event.currentTarget;

  let delayIncrement = 200;
  Object.entries(myLibrary[currentIndex]).forEach(([key, value], index) => {
    const newCard = document.createElement('div');
    newCard.classList.add('invisible');

    const keyPara = document.createElement('p');
    const valuePara = document.createElement('p');

    const keyText = document.createTextNode(key.toUpperCase());
    const valueText = document.createTextNode(value.toString());
    keyPara.appendChild(keyText);
    valuePara.appendChild(valueText);

    newCard.appendChild(keyPara);
    newCard.appendChild(valuePara);

    cardElement.appendChild(newCard);

    setTimeout(() => {
      newCard.classList.add('move-to-place');
      setTimeout(() => {
      newCard.classList.remove('move-to-place');
      newCard.classList.remove('invisible');
    }, delayIncrement);
    }, index * delayIncrement);
  });
});




function Book(title, author, pages, editionYear, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.editionYear = editionYear;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
}

function updateIndex(index, array) {
  index = (index + 1) % array.length;
  return index;
}