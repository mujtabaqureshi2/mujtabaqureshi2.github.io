//  Class Book: Represents a Book
class Book{
  constructor (title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn =isbn;
  }
}
// UI class: Handle UI tasks
  class UI{
    static displayBooks(){
  
      const books = Store.getBooks();

      books.forEach((book)=>UI.addBookToList(book));
    }

    static addBookToList(book){
     const list = document.querySelector('#book-list');

     const row = document.createElement('tr');

     row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class= "btn btn-danger btn-sm delete">X</a></td>
     `;
     list.appendChild(row);
     
    }
    static deleteBook(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
      }
    }
    // clear fields
    static clearFields(){
      document.querySelector('#title').value= '';
      document.querySelector('#author').value='';
      document.querySelector('#isbn').value='';
      
    }

   

    static ShowAlert(message, className){
      const div =document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container= document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div,form);

      setTimeout(()=>document.querySelector('.alert').remove(), 3000);
    }
  }
  // Store class: Handles storage
   class Store{
   static  getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
      books=[];
    }
    else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
   }
   static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
   }

   static removeBook(isbn){
      const books = Store.getBooks();
      books.forEach((book,index)=>{
        if(book.isbn===isbn){
          books.splice(index,1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
   }
 }
// Events: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);
// Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)=>
   {
    // Prevent actual Default
    e.preventDefault();

    // Get form value
    const title= document.querySelector('#title').value;
    const author= document.querySelector('#author').value;
    const isbn= document.querySelector('#isbn').value;


    if(title==='' || author ==='' || isbn==='' ){
      UI.ShowAlert('Please fill in all the fields','danger');
    }
    else{
    // instantiate a book
    const book = new Book(title,author,isbn);
    
    // Add Book to list
    UI.addBookToList(book);

    // Add Book to store
    Store.addBook(book);

    // Show success message
    UI.ShowAlert('Book Added','success'); 

    // Clear Fields
    UI.clearFields();
    }
    UI.clearFields();
   });

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  //  Remove Book frm store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.ShowAlert('Book Delete', 'success' );
});