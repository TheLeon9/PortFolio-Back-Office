# 🔐 Back Office Front Microservice

This microservice provides a **front-end interface** for internal back office operations, interacting with a local database via multiple exposed routes.

## 🚀 How It Works

The service communicates with the **API** through various **routes** to impact (create, read, update, delete) the local database.

## 📦 Installation & Launch

### Clone the project

    >   git clone <repo-url>

### Navigate to the project folder

    >   cd project-folder-name

### Install dependencies

    >   npm install

### Add environment variables

Create a `.env` file at the root of the project with the following content :

```
AUTH_API="http://localhost:port"
METRICS_API="http://localhost:port"
BDD_API="http://localhost:port"
```

### Run tests

    >   npm test

### Start the server

    >   npm start

---

## 🎴 Technologies Used

- ⚛️[**Next.js**](https://nextjs.org/): A React-based framework for building server-rendered and statically generated web applications.
- ⚛️[**React**](https://react.dev/): A declarative JavaScript library for building user interfaces.
- ⚛️[**SASS (JWT)**](https://sass-lang.com/): A CSS preprocessor to write more maintainable and cleaner stylesheets.
- ⚛️[**Pino**](https://www.npmjs.com/package/pino): A fast and lightweight logger for Node.js.
- ⚛️[**Pino-pretty**](https://www.npmjs.com/package/pino-pretty): Pretty prints logs from Pino for better readability during development.

---

## 🔒 Security

_Even though the service is simple, it relies on a **JWT** obtained through the **login process**. This `token` is **required** for **all** communications with the local API._

_While the `token` is signed server-side with a secret key **(JWT_SECRET)**, make sure to never expose or commit sensitive files like your `.env` to a public repository._

---

## 📬 Notes

This microservice is designed to be used only in a **local context**.

It simply interacts with a local API 😄

---

## 🏯 License

This project is not licensed for public use.
All rights reserved. ☠️

---

## 🗺️ Contact

For any inquiries, suggestions, or collaboration opportunities, don't hesitate to contact me. 📜

---

## 🧑🏻‍💻 Author

Created by TheLeon 🦁.

> "Creativity is intelligence having fun." - Albert Einstein ☄️

Thanks for visiting my github! 🩵

And as we say in France : Merci ! 💙🤍❤️
