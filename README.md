# Home Library Service

## Instruction how to run application

1. Run `npm run install` to install dependencies
2. Copy the `.env.example` file over to your own `.env` file
3. Run `docker-compose up -d` to create docker image and start docker container
4. Run `npx prisma migrate dev` to run local database migrations
5. Run `docker compose down` to stop docker container

## Vulnerabilities scanning

1. Run `npm run docker:scan` to vulnerabilities scanning

## Check deploy on docker hub

1. Check this link:https://hub.docker.com/r/mazeltovik/nodejs2022q4-service-api



## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
