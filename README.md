
# Note Application

![Logo](https://github.com/SasinduMallawarachchi/NoteApp/blob/master/client/public/Screenshot.png)

Hi! I have created online web application where students can maintain their notes virtually. They can make, edit update delete their notes and as well as they can update their profile also.
I have used jwt for generate tokens and I have used bcrypt for improve password security.

## Tech Stack

**Client:**
<br>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Server:** 
<br>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Database:** 
<br>
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

**Sub Technologies:** 
<br>
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)


## Run Locally

+ Clone the project

```bash
  git clone https://github.com/Anuka-R98/ITPM_PROJECT.git
```

+ Go to the project directory


+ Environment Variables

     *To run this project, you will need to create a .env file in root and add the following environment variables to your .env file.*

         NODE_ENV = development
         PORT = 5000
         MONGO_URI = your mongodb uri
         JWT_SECRET = 'NoteDemo_api_secret'

+ Install dependencies (frontend & backend)

```bash
 cd client
 npm i
 cd server
 npm i
```

+ Run backend only

```bash
  cd server
  npm run 
```
+ Run frontend only

```bash
  cd client
  npm run 
```

+ Run frontend (:3000) & backend (:5000)

```bash
  cd server
  npm run dev
```
