# Ultimate Backend API Starter Kit
### A robust and production-ready backend API starter kit built with TypeScript, Express.js,Zod and Mongoose.

## Features
- Type-safe API development with TypeScript,Zod for schema validation.
- Caching Layer using Redis.
- Seamless data modeling and interaction with MongoDB using Mongoose.
- TypeSafe Environment configuration.
- Auth using JWT Strategy or passport.
- Helmet middleware for Strong security headers.
- Cors middleware for Cross-Origin Resource Sharing.
- Rate limiting middleware for enhanced security using express-rate-limit with redis for centralized storage.
- Streamlined error handling and logging using custom httpResponse ,Global Error Handler and httpError.
- Logging (With Colorful Terminal) with winston for better debugging and monitoring.
- Linting,Husky,eslint,prettier,commitlint for code quality.
- Server Health Monitoring using Custom API endpoint.
- Github Actions for CI/CD.
- Docker support for containerized deployment
- MVC Architecture.
- WebSocket Support using ws package (optional).


## Prerequisites

- Node.js (version 18 or higher)
- yarn
- Redis
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/arunkumar201/rest-api-using-ts.git
   ```
2. Navigate to the project directory:
   ```
   cd rest-api-using-ts
   ```
3. Install dependencies:
   ```
   yarn install
   ```

## Configuration
 - Create a `.env` file in the root of the project according to `.env.example` and add the following environment variables:

## Running the Application

To start the server in development mode:
```
yarn dev
```
For production:

```
yarn build
yarn start:prod
```
## Contributing
- Fork the repository
- Create a new branch
- Make your changes
- Create a pull request
