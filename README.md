# BikeBack

BikeBack is a mobile application designed to enhance the cycling experience for bike enthusiasts. It offers two main modes: Leisure Mode and Destination Mode, allowing users to either enjoy a casual ride or navigate to a specific destination.

## Features

- **Leisure Mode**: Users can specify a duration for their ride, and the app will generate a route that fits within that time frame.
- **Destination Mode**: Users can set a starting point and destination, and the app will provide turn-by-turn navigation.
- **Ride History**: Users can view a history of their past rides, including details like duration, distance, and average speed.
- **User Account Management**: Features for signing up, logging in, changing passwords, and updating usernames.

## Technology Stack

- **Frontend**: React Native, Expo
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **APIs**: Google Maps API for route generation and navigation
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication
- **Storage**: Expo Secure Store for secure local storage of tokens

## Setup and Installation

To set up the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies for both the app and server:
``` bash
cd app
npm install
cd ../server
npm install
``` 
3. Start the backend server:
```bash 
cd server
npm run dev
```
4. Start the Expo development server:

```bash 
cd app
npx expo start

```
5. Open the project in Expo Go on your mobile device or use an emulator to run the app.

## Contributing

Contributions are welcome! Please read the contribution guidelines before submitting a pull request.
