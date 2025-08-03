# GROUP-5 SNAP BID

- Name: Snap Bid Web App in MERN Stack
- Course: CSIS 3380-002
- Assignment: Final Group Project
- Group: 5
- Members: Khushi Bhatt, Disha Khare, Aarti Pandya, Kenneth Rofuli


DETAILS:
-----------------------------------------
- All user can enter the site and see all the items in auction.
- The auction items are recorded in Mongo database.
- Users can do a search among items
- The remaining time for finalization of the auction can be seen in items page
- In order to bid in auction, user has to sign up / login
- In order to add or delete items, user has to be ADMIN.
- Admins can set the target value of the ongoing auction.
- Backend has various controls and validation for sign up and login procedures
- When a logged in user bids, backend checks if the bid is proper or not (bigger than last bid etc...). If confirmed, the new bid will be registered to the bidding history of that specific item.
- When an admin creates a new auction item, backend controls all the input fields and adds the item if all fields are proper.
- All items have their own bidding history in the database.
- Only administrative users can add new items to database (when logged in as admin, you can see Add Item button, and there is a privilege control in the back end too)
- The total amount of all bids is shown in the hero section as a progress bar.
- The /item urls are related to items API.
- The /user urls are related to authentication, sign up, login API.


API ENDPOINTS:
-----------------------------------------
GET /items --> gives all items in auction<br>
POST /items --> add a new item (allowed to administrative users only)<br>
GET /items/:id --> gives a specific item with more details<br>
PUT /items/:id --> adds a new bid to a specific item (allowed only if logged in)<br>
DELETE /items/:id --> delete an item (allowed to administrative users only)<br>
POST /user/register --> sign up new account<br>
POST /user/login --> login<br>
POST /user/logout --> logout


PROGRESS:
-----------------------------------------
- Created architecture as "server" and "frontend" inside main app folder.
- SERVER is created (EXPRESS)
- FRONTEND is created (REACT)
- DATABASE is created on Mongodb Atlas Cloud
- App is serving all and individual auction items as intended.
- Implemented frontend with React
- ADD Item / DELETE Item functionality is added
- User model created
- Registeration is implemented with password encryption
- JWT is implemented to save session
- cookie operations implemented to save authentication
- all pages are showing different UI based on authhentication status and admin status
- API endpoints are secured with authentication and authorization checks
- adding new bid procedure is implemented
- progress bar is implemented
