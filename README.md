# Platzi Trello

This project is a clone of the **Trello** project management application, developed using **Angular** in standalone mode. The goal is to recreate Trello's core functionality, allowing users to manage tasks through a board-and-card system. Additionally, it includes an authentication and access control system with advanced security features to manage user sessions and route protection.

## Features

This Trello clone includes the following main features:

- **User Registration**: Allows new users to create an account.
- **Login**: Authenticates users so only registered users can access the application.
- **Password Change**: Allows users to change their current password within their profile.
- **Password Recovery**: Process for users to reset their password if they forget it.
- **User Retrieval**: Provides a list and details of users within the application.
- **Token Regeneration**: Security mechanism to refresh the authentication token, avoiding expired sessions.
- **Auth Guards**: Route protection to ensure only logged-in users can access certain parts of the application.

## API

For the backend, this project uses the **Fake Trello API** hosted at [fake-trello-api.herokuapp.com](http://fake-trello-api.herokuapp.com). This API provides simulated endpoints for authentication, user management, and task handling.

## Technologies Used

- **Frontend**: Angular (in standalone mode) to create a modular, scalable, and highly maintainable interface.
- **State Management**: Angular Services and `RxJS` for managing application state.
- **Authentication**: Token-based JWT authentication provided by the Fake API.
- **Guards**: Angular Guards to protect routes and verify if the user is authenticated before allowing access.
- **Standalone Components and Services**: Standalone architecture in Angular for easy reusability and separation of concerns.

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trello-clone-angular.git
    ```
2.	Navigate to the project directory:
   ```bash
   cd trello-clone-angular
    ```
3.	Install the dependencies:
   ```bash
   npm install
    ```

## Running the Project
1.	Start the development server:
   ```bash
   ng serve
    ```
2.	Open your browser at http://localhost:4200 to view the application.


## Contributions

This project is open source. If you find any issues, have improvement suggestions, or want to contribute, please open an issue or submit a pull request. Contributions are very welcome!

## License

This project is distributed under the MIT License.