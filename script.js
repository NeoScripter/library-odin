document.addEventListener('DOMContentLoaded', function() {

  const myLibrary = [
    new Book("To Kill a Mockingbird", "Harper Lee", 281, 1960, false),
    new Book("1984", "George Orwell", 328, 1949, false),
    new Book("Pride and Prejudice", "Jane Austen", 432, 1813, false),
    new Book("Harry Potter", "J.K. Rowling", 309, 1997, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, false)
  ];
  
  let currentIndex = 0;
  const row = document.querySelector('.row');
  const libraryLenght = myLibrary.length;
  const libraryMiddle = libraryLenght % 2 !== 0 ? Math.floor(libraryLenght / 2) : libraryLenght / 2 - 1;
  currentIndex = libraryMiddle;
  let currentEventHandler = null;
  assignThePrimaryColumn(row, myLibrary);

  for (const [index, book] of myLibrary.entries()) {
    const column = document.createElement('div');
    if (index === libraryMiddle) {
      column.id = 'primary';
    }
    column.classList.add('column');
  
    const columnContent = document.createElement('div');
  
    const title = document.createElement('p');
    title.textContent = 'Title'; 
  
    const titleName = document.createElement('p');
    titleName.textContent = book.title; 
  
    columnContent.appendChild(title); 
    columnContent.appendChild(titleName); 
  
    column.appendChild(columnContent); 
    row.appendChild(column);
  }

  const primary = document.getElementById('primary');
  currentEventHandler = addEventsToPrimary(primary, currentIndex);
  
  function addEventsToPrimary(primaryCard, currentIndex) {
    let isEffectApplied = false; // Flag to track the state
  
    const eventHandler = event => {
    const cardElement = event.currentTarget;
  
    if (!isEffectApplied) {
      // Apply the effect
      let delayIncrement = 200;
      Object.entries(myLibrary[currentIndex]).forEach(([key, value], index) => {
        if (key !== 'title') {
          const newCard = document.createElement('div');
          newCard.classList.add('invisible', 'dynamic-card');
  
          const keyPara = document.createElement('p');
          const valuePara = document.createElement('p');
  
          const keyText = document.createTextNode(capitalizeFirstLetter(key));
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
        }
      });
      isEffectApplied = true;
    } else {
      let delayIncrement = 200;
      let idx = 1;
  
      // Convert NodeList to an array and reverse it
      const cards = Array.from(document.querySelectorAll('.dynamic-card')).reverse();
  
      cards.forEach(card => {
        setTimeout(() => {
          card.style.zIndex = '-10';
          card.classList.add('move-to-place');
          setTimeout(() => {
            card.remove();
          }, delayIncrement);
        }, idx * delayIncrement);
        idx += 1;
      });
      isEffectApplied = false;
    }
  };
  primaryCard.addEventListener('click', eventHandler);
    return eventHandler; // Return the function reference
  }
  
      const nextButton = document.querySelector('.next');
      const prevButton = document.querySelector('.prev');
  
      nextButton.addEventListener('click', function() {
          const carousel = document.querySelector('.row');
          const lastItem = carousel.querySelector('.column:last-child');
          const firstItem = carousel.querySelector('.column');
          carousel.removeChild(lastItem);
          carousel.insertBefore(lastItem, firstItem);
  
          const primary = document.getElementById('primary');
          const prevPrimary = primary.previousElementSibling;

          if (currentEventHandler) {
            primary.removeEventListener('click', currentEventHandler);
          }
          primary.removeAttribute('id');
          prevPrimary.id = 'primary';
          currentIndex = decrementIndex(currentIndex, myLibrary);
          currentEventHandler = addEventsToPrimary(prevPrimary, currentIndex);
      });
  
      prevButton.addEventListener('click', function() {
          const firstItem = document.querySelector('.column');
          const carousel = document.querySelector('.row');
          carousel.removeChild(firstItem);
          carousel.appendChild(firstItem);
  
          const primary = document.getElementById('primary');
          const nextPrimary = primary.nextElementSibling;

          if (currentEventHandler) {
            primary.removeEventListener('click', currentEventHandler);
          }
          
          primary.removeAttribute('id');
          nextPrimary.id = 'primary';
          currentIndex = incrementIndex(currentIndex, myLibrary);
          currentEventHandler = addEventsToPrimary(nextPrimary, currentIndex);
      });

      const removeBtn = document.querySelector('.remove-book-btn');
      removeBtn.addEventListener('click', () => {
        removeBookFromLibrary(currentIndex);
        assignThePrimaryColumn(row, myLibrary);
        const primary = document.getElementById('primary');
        let nextPrimary;
        if (myLibrary.length % 2 === 0) {
          nextPrimary = primary.previousElementSibling;
          currentIndex--;
        } else {
          nextPrimary = primary.nextElementSibling;
        }
        primary.remove();
        nextPrimary.id = 'primary';
        if (currentEventHandler) {
          primary.removeEventListener('click', currentEventHandler);
        }
        currentEventHandler = addEventsToPrimary(nextPrimary, currentIndex);
      });

      const formOverlay = document.querySelector('.overlay');

      const addBtn = document.querySelector('.add-book-btn');
      addBtn.addEventListener('click', () => {
        formOverlay.style.display = 'flex';
      });
      
      const form = document.getElementById('add-book-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const editionYear = document.getElementById('edition').value;
            const readOrNot = document.getElementById('read').value;
            const read = readOrNot == "yes" ? true : false;
            const pagesNum = parseInt(pages);
            const edition = parseInt(editionYear);

            addBookToLibrary(title, author, pagesNum, edition, read);
            formOverlay.style.display = 'none';
    });

  
  function Book(title, author, pages, editionYear, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.editionYear = editionYear;
    this.read = read;
  }
  
  function addBookToLibrary(title, author, pages, editionYear, read) {
    const newBook = new Book(title, author, pages, editionYear, read);
    myLibrary.push(newBook);
    assignThePrimaryColumn(row, myLibrary);
    const column = document.createElement('div');
    column.classList.add('column');
  
    const columnContent = document.createElement('div');
  
    const bookTitle = document.createElement('p');
    bookTitle.textContent = 'Title'; 
  
    const titleName = document.createElement('p');
    titleName.textContent = title; 
  
    columnContent.appendChild(bookTitle); 
    columnContent.appendChild(titleName); 
  
    column.appendChild(columnContent); 
    row.appendChild(column);
  }

  function removeBookFromLibrary(currentIndex) {
    myLibrary.splice(currentIndex, 1);
  }
  
  function incrementIndex(index, array) {
    index = (index + 1) % array.length;
    return index;
  }

  function decrementIndex(index, array) {
    index = index !== 0 ? index - 1 : array.length - 1;
    return index;
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function assignThePrimaryColumn(row, library) {
    const libraryLenght = library.length;
    if (libraryLenght % 2 === 0) {
      row.style.paddingLeft = '282px';
    } else {
      row.style.paddingLeft = '0px';
    }
  }
});
