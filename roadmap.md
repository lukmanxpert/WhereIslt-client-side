<!-- # **assignment\_category\_11**  

**Dear Candidates,**

## Great news\! You've made it through our first selection round. We were impressed by your application and skills. You're now invited to the next stage of our selection process. This upcoming project is your chance to show us what you can do. We want to see how you:

* ## Tackle challenges

* ## Use your creativity

* ## Solve problems

* ## Deliver top-quality work

## We're looking forward to seeing your unique talents in action, and this is an exciting opportunity to demonstrate your potential.

--- -->

#### WhereIsIt (A Find and Lost items related website) 

##### **Project Overview and Discussion**

This project is a **Lost and Found Website**, a platform designed to connect individuals who have lost personal belongings with those who may have found them. Users can report lost items, browse found items, and interact to recover their belongings. Developing this website provides practical experience in building full-stack applications, user authentication, file uploads, database management, and API integration

---

#### Ensure the Following things to get a 100% mark

* Include at least 15 meaningful commits on the client side & 8 meaningful commits on the server side with descriptive messages.  
* Include a README file with the project name, purpose, live URL, key features, and any npm packages you have used.  
* Ensure the website is fully responsive on mobile, tablet, and desktop.  
* Secure Firebase configuration keys using environment variables.  
* Secure your MongoDB credentials using the environment variable.  
* Create a design that encourages recruiters. Color contrast should please the eye & ensure that the website has proper alignment and space. The website does not express gobindo design

#### Deployment Guideline

If your Deployment is not okay you will get 0 and may miss the chance of our upcoming rewards. 

* Ensure that your server is working perfectly on production and not throwing any **CORS / 404 / 504** Errors.    
* Ensure that your Live Link is working perfectly and that it is not showing errors on Landing in your system.    
* ⚠️ ensure that the page doesn't throw any error on reloading from any routes.    
* ⚠️ Add your domain for authorization to Firebase if you use **Netlify** / **surge**  
* ⚠️ Logged in User must not  redirect to Login on reloading any private route 

---

#### Layout & Page Structure

1.  **Navbar:**  
<!-- * **Website Name/Logo:** Should reflect the theme   -->
<!-- * **Home:** Displays the homepage with key sections and posts.   -->
<!-- * **Lost & Found Items Page:**    -->
* **Conditional Login/Logout:**  
  * If not logged in, show a *Login* button.  
  * If logged in, show the user's profile picture and *Logout* button.  
  * On hovering over the profile picture, show the user’s display name.  
* **Profile Picture (Dropdown):**  
  * Add Lost & Found Item Page **(Private/Protected Route)**  
  * All Recovered Items Page **(Private/Protected Route)**  
  * Manage My Items Page**(Private/Protected Route)**  
<!-- 2. **Main Section:**  Main Section will show different pages based on routes.     -->
<!-- 3. **Footer:** A Footer with all relevant information and eye-catching design. -->

---

#### Authentication System

4. **Login Page:** When you click the login button on the navbar it redirects to the login page. You have to use a password and email-based authentication to log in. The login page will have-    
   1. Email   
   2. Password   
   3. Google login/ GitHub-  implement any of one   
   4. A link that will redirect to the Register page   
5. **Register Page:** You have to use a password and email-based authentication to register. The Register page will have the following \-   
   5. Name   
   6. Email   
   7. photoURL   
   8. password    
   9. A Link that will redirect to the login page   
* For password verification you need to follow this \-  Must have an Uppercase letter, a lowercase letter, Length must be at least 6 character   
* If any of this isn’t fulfilled it will show an error message /toast  
* After successful login or Register you need to show toast/sweet alert 

---

#### Home Page 

6.  **Home Page Features:**  
   * **Banner/Slider:** Add a slider (you can use any type of static slider/carousel)  with a minimum of 3 slides and meaningful information.  
   * **Latest Find & Lost Items Section:** Showcase 6 find & lost item posts [sorted](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/) by the most recent date. Each card should display:  
     1. Choose which information you want to show  
     2. *View Details* button (it will redirect you to the **Details Page**)   
     3. **See all button:** Below the 6 cards, there will be a see all button that will redirect the user to the **Lost & Found Items Page**.   
   * **Extra Sections:** Add 2 relevant and meaningful extra sections on the Home page.    
   * Implement framer motion in your Home page. 

---

#### Other Requirements Guideline

7. ##### **Add Lost & Found Item Page: ( Private Route): /addItems**

   A private page where users can submit details about lost items through a form:  
   * **Post Type:** Dropdown for "Lost" or "Found."  
   * Thumbnail (Image Upload).  
   * Title  
   * Description  
   * Category (e.g., pets, documents, gadgets)  
   * Location where the item was lost or found  
   * Date Lost or found  (use [React Datepicker](https://reactdatepicker.com/))  
   * Contact Information (pre-filled with logged-in user details- displayName, email).  
   * **Add Post** button (store data in the items collection in the database and show a success toast).

8. #####  **Post Details Pages:( Private Route): /items/:id**

* Display all data related to a lost or found item.  
* Include a button: (it will be conditional based on **post types** )  
  * For Post type \=\> Lost: **Found This\!**  
  * For Post type \=\> Found: **This is Mine\!**  
* Clicking on the button it will open a modal and will take all the information of the item includes-   
  * Recovered location (where it was given/received to original owner)   
  * Date (In which date it was given/received to original owner)   (use [React Datepicker](https://reactdatepicker.com/))   
  * Recovered person info( logged in user email, name, image) (readonly)   
  * Submit button

Clicking on the submit button will store the item information in another collection database. And it will update its status as “recovered”  in the items collection also.  If the item is already recovered you can not do it again. 

9. **Lost & Found Items Page: /allItems**  
   * On this page, you will show All the Found and Lost items posts users have added. You need to show it in a card format. Each card will contain-   
   * 3-4 information from that post   
   * View Details button  – will redirect to the **Details Page**  
     

10. ##### **Manage My Items Page: (Private route):  /myItems**

    * Show all posts in table format added by the logged-in user,   
    * If there is no data then show a meaningful message or something relevant.   
    * Show 3-4 information in the table  
    * **Update Button:**   
    * **Delete Button:**   
      

11. ##### **Update Items Page (Private Route): (/updateItems/:id)**  

    Create an **Update Items Page** where users can update their previously added items post. The form should include:  
* All fields from the "**Add Lost & Found ItemPage**".  
* Pre-fill the fields with existing data from the database.  
* **User Email** and **User Name** should remain read-only.  
* Clicking the "Update" button will save changes and display a success message.

**Optional**: Use a modal instead of a separate page for updating Items. 

12. #####  **Delete Feature:**

* Clicking the "Delete" button will remove the Item data after a confirmation prompt. 

13. ##### **All Recovered Items Page:(Private route):  /allRecovered** 

    * Show all recovered  posts in table format added by the logged-in user,   
    * If there is no data then show a meaningful message or something relevant.   
    * Show 3-4 information in the table

---

#### Additional 

* **Dynamic Title:**  Make your website title Dynamic.  For every Route change,  The Website Title will be changed based on that route.   
* **404 page:** Add a 404 page/Not Found Page  
* **Spinner:** Show a loading spinner when the data is in a loading state.   
* **Toast:** For all the CRUD operations, show relevant toast/ notification/ sweet alert with a meaningful message

---

#### Challenge Requirement Guideline 

* **Search Functionality:**On the ***Lost & Found Items*** **pages**, implement a search input to filter posts by title or location.

* JWT Authentication:  Upon login, you will create a JWT token and store it on the client side. You will send the token with the call and verify the user. Implementing 401 and 403 is optional. Ensure you have implemented the JWT token, create a token, and store it on the client side for both email/password-based authentication and social login. You must implement JWT on your private routes.  
* **Change Layout:** In **All Recovered Items Page**, Initially there will be a three-column layout. On clicking the change layout button, the layout will change in the card to a table form layout.

![][image1]

![][image2]

---

#### What to Submit

Live Site Link :   
GitHub Repository ( **server** ) :   
GitHub Repository ( **client**  ) : 

#### Optional Requirement Guideline (But Highly Recommended) 

Implement any two tasks from the following optional list:

1. Try to use any other tailwind CSS library like \- [mamba Ui](https://mambaui.com/), [shadcn](https://ui.shadcn.com/), [chakra UI](https://chakra-ui.com/), [flowbite](https://flowbite.com/).   
2.  Explore and implement any of the animations from the Framer Motion.  
3.  Add one extra feature of your own. This will help you in the future to differentiate your project from others.  
4.  Implement Pagination in the ***Lost & Found Items*** **page**. Show 6-9 services per page.
