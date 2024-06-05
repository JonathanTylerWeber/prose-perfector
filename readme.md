# Prose Perfector: Writing Rating and Feedback Application

## [Prose Perfector](https://capstone-2-cetn.onrender.com/)

### Description
Prose Perfector is a web application that allows users to submit their writing for evaluation. Users can specify the type of writing (e.g., essay, story) and an adjective (e.g., persuasive, entertaining) to receive a rating and feedback on their submission. Additionally, Prose Perfector offers a rewritten version of the submitted text for improved clarity, style, and adherence to the specified adjective.

### Features
- **User Authentication**: Users can sign up, log in, and log out securely.
- **Submit Writing**: Users can submit their writing for evaluation by specifying the type and an adjective.
- **Receive Feedback**: Users receive a rating and feedback on their submission.
- **Rewrite Text**: Users are provided with a rewritten version of their text.
- **History**: Users can view their submission history.
- **Profile Management**: Users can update their profile information.

These features were chosen to provide a comprehensive and user-friendly experience for writers seeking feedback and improvement on their work.

### Technology Stack
- **Frontend**: React, React Bootstrap, Vite
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **API**: OpenAI API
- **Testing**: ViteTest, Jest
- **Authentication**: JWT (jsonwebtoken, jwt-decode)
- **Password Management**: bcrypt
- **Validation**: jsonschema
- **HTTP Requests**: axios

### Tests
To run the tests, use the following commands (Backend in main directory, Frontend in frontend directory):

- **Tests**: 
  ```sh
  npm run test


### User Flow
1. **Sign Up**: New users create an account by providing a username, password, and other necessary details.
2. **Log In**: Returning users log in with their credentials.
3. **Submit Writing**: Users navigate to the submission form, enter their text, specify the type and an adjective, and submit.
4. **Receive Feedback**: The application processes the submission using the OpenAI API and provides a rating, feedback, and a rewritten version.
5. **View History**: Users can view their past submissions and the feedback received.
6. **Update Profile**: Users can update their profile information through the profile form.

### API Documentation

- **Rating and Feedback Endpoint**:
    ```sh
    POST /submit/rating
    ```
    - **Request**: 
      ```json
      { 
        "type": "thank you letter", 
        "adj": "sincere", 
        "prompt": "Your text here" 
      }
      ```
    - **Response**: 
      ```json
      { 
        "result": "rating and feedback here"
      }
      ```

- **Rewrite Endpoint**:
    ```sh
    POST /submit/rewrite
    ```
    - **Request**: 
      ```json
      { 
        "type": "thank you letter", 
        "adj": "sincere",  
        "prompt": "Your text here" 
      }
      ```
    - **Response**: 
      ```json
      { 
        "rewritten": "Your improved text here" 
      }
      ```

#### Custom API

- **User Prompts**:
    ```sh
    GET /users/:username/prompts
    ```

- **Save Prompt**:
    ```sh
    POST /prompt
    ```

- **Delete Prompt**:
    ```sh
    DELETE /prompt/:username/:promptId
    ```

- **Get Current User**:
    ```sh
    GET /users/:username
    ```

- **Update User**:
    ```sh
    PATCH /users/:username
    ```

### Additional Information
- The application utilizes extensive testing to ensure robustness and reliability.
- Authentication is handled securely with JWT tokens.
- Passwords are hashed using bcrypt for security.
- All inputs are validated using jsonschema to maintain data integrity.

