## Project overview

Using react, tailwindcss and other technologies for client and node.js,express.js and mongodb for server side, I have built a web application which delivers the book from the nearest library to the reader's home. It's like a book deliver system application. My project name is "ReadReach".

# Purpose of this application;

ReadReach save the time of many readers. Readers can easily read book from their nearest library by using this application. As well as reader can choose their expected book that he/she want to read by browsing the all book page.It allows the readers to read the books without going to the library.

# Project live URL;

This is my project live URL:

# Key features of this application;

## I have managed three user role in my application normal user,librarian and admin;

### key feature for all users

1. I have implemented the authentication system using firebase to get valid users;

2. Using reactLeaflet, I have implemented the map where user can see their location and where we are providing our services.

3. When user will click the view detail button of book card he/she will be navigated to the book detail page where user can see the all detail of this books and order the book by completing the order form.

### key features of normal user

1. I have also implemented a book ordering system where user can order their favorite books.
   When user order book then this order data will be saved to the database and user can see their order data by navigating the my orders page.
   Here I have implemented payment system using stripe prebuilt checkout so that user can pay for their order.If his/her payment is successful, he/she redirects the payment successful page and save their payment history to the database.And user can see their payment history navigating the payment history page.

2. In the book detail page I have added a wishlist button to add book to the wishlist. User can see their wishlist book by navigating the wishlist page.

### key feature of Librarian;

1. A librarian can add his own book by filling the book add form. In the book add form, I have included many fields for book data where librarian provides the information of book. If the librarian leaves a field blank, the form will not be submitted.And it show him/her error message like this "example field is required".
2. "My Books" page here librarian can see he/her own books that he/her added.In this page, Librarian can change the book status like "published or unpublished". If the status is published, the book will be displayed on the all books page and if not, it won't displayed on the all books page. Also here librarian can edit his/her own book by click the edit button.

3. "Orders" page, here librarian can see this book's order that he added on this application. And here he can change the order status of specific book like pending to processing, processing to shipped, shipped to delivered. Also he is able to delete any orders as his wish.

### key feature of Admin

1.  Amin can manage user role. He/She can change the user role.
2.  Also he can delete the from the database and change the published_status.
