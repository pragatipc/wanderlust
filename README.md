Wanderlust – Travel Listing Platform
A full-stack travel listing platform built with Node.js, Express, MongoDB, Passport.js, MapLibre GL JS, and OpenStreetMap API. Users can create, manage, and review travel listings with interactive maps, authentication, and more.

Setup Instructions
Prerequisites
Make sure you have the following installed:

Node.js (v14 or above)

MongoDB (local or use MongoDB Atlas)

npm (Node Package Manager)

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
2. Install Dependencies
Run the following command to install all necessary dependencies:

bash
Copy
Edit
npm install
3. Setup Environment Variables
Create a .env file in the root directory with the following details:

env
Copy
Edit
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wanderlust
SESSION_SECRET=your-session-secret
Replace mongodb://localhost:27017/wanderlust with your MongoDB connection string if you're using MongoDB Atlas.

4. Start the Development Server
Run the following command to start the server:

bash
Copy
Edit
npm start
The app should now be running at http://localhost:3000.

5. Visit the Application
Open your browser and go to http://localhost:3000 to view the live app.

Features
User authentication using Passport.js.

Listing creation with images, pricing, and location details.

Interactive map views using MapLibre GL JS and OpenStreetMap API.

Reviews and ratings for each listing.

Centralized error handling and flash messaging.

Additional Notes
This app uses the MVC architecture to organize code and separate concerns.

For map integration, I used MapLibre GL JS and OpenStreetMap API as alternatives to Google Maps.

Authentication is session-based, using Passport.js for login and user management.

Future Improvements
Implement real-time features such as live chat or notifications for users.

Add additional filtering options for listings (e.g., price range, ratings).

Improve user interface with more advanced frontend tools.

