# react-node-randomfile
## Description
This is a full-stack web app that generates a file that contains 2MB of random objects (alphabets, integers, real numbers, and alphanumerics). It also logs the count of the occurrence of each type of random object.

## Project Structure
The project contains both the server and the client apps. The server scripts are all placed in the `server` folder whereas the `client` folder contains the client-facing codes.

## Setup
1. Clone this repository. 
2. Run `npm install` in the root directory to install the dependencies for the server app. 
3. Navigate to the `client` folder and run `npm install` once more to install the dependencies for the client app.
4. In the root directory, run `npm start` to start the server app. 
5. On another terminal, navigate to the `client` folder and run `npm start` to start the client app.

## Tech Stack
Server App 
- Node.js
- Express.js

Client App
- React
- React-Bootstrap 

## Limitations 
1. The download link to the file that contains the random objects, due to same-origin-policy, couldn't initiate the browser download automatically. This is because the underlying implementation uses an `<a href>` tag to point to the actual file generated on the server. 
2. The size of the generated file is only an approximate of 2MB (2 * 1024 * 1024 bytes) for performance consideration.
3. The algorithm that generates the random objects assumes a max length of 15 digits for numerics/real numbers and 20 digits for alphabets and alphanumerics.  