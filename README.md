# Home Library Service

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
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Using application

Application have five different endpoints:

- http://localhost:4000/user for creating, changing, deleting users;
- http://localhost:4000/album for creating, changing, deleting albums;
- http://localhost:4000/artist for creating, changing, deleting artists;
- http://localhost:4000/track for creating, changing, deleting tracks;
- http://localhost:4000/favs for creating, changing, deleting favorites.

Use this is routes for testing application.
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
