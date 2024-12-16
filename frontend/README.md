# Authentication

- We have nextAuth for Authentication. The documentation link is <a href="https://next-auth.js.org/configuration/initialization#route-handlers-app"> next Auth </a>
- We are only using the credentials provider.
- RBAC is applied to the project. we have two types of users. user and admin.

## Exposing authenticated routes
- run `http://localhost:3000/api/auth/providers` Your Signin url will be there . Source <a href="https://next-auth.js.org/getting-started/rest-api">Link </a>

## How to access the login page.
- When you configure NextAuth.js, it provides a sign-in page by default at `/api/auth/signin` or `http://localhost:3000/api/auth/providers`. You don't need to create a custom login page unless you want to customize it.
- So When a user navigates to /api/auth/signin or tries to access a protected route that requires authentication, NextAuth.js automatically redirects the user to the default sign-in page.
- Since we are using the Credentials Provider, NextAuth.js will show a form where users will input their credentials (email and password). It handles the form submission, validation, and authentication behind the scenes.

- the redux.tsx contains boiler plate for connecting all nextjs redux to redux persist