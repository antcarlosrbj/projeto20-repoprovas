<p align="center">
  <a href="https://github.com/antcarlosrbj/projeto20-repoprovas">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg" alt="RepoProvas-logo" width="100" height="100">
  </a>

  <h3 align="center">
    RepoProvas
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/antcarlosrbj/projeto20-repoprovas

$ cd projeto20-repoprovas

$ npm install

$ npx prisma init

$ npx prisma migrate dev

$ npx prisma generate

$ npm run dev
```

## API:

```
- POST /sign-up
    - Route to register new user
    - headers: {}
    - body: {
      "email": "antonio@antonio.com",
    	"password": "12345678",
    	"passwordConfirmation": "12345678"
    }


- POST /sign-in
    - Route to sign in
    - headers: {}
    - body: {
        "email": "antonio@antonio.com",
        "password": "12345678"
    }


- POST /test/add
    - Route to add a test
    - headers: {
        "Authorization": "Bearer <TOKEN>"
    }
    - body: {
        "name": "Google",
        "pdfUrl": "http://www.google.com",
        "categoryId": 1,
        "disciplineId": 5,
        "teacherId": 2
    }

```
