# React Frontend

## Follow Backend README First

#### Setup Doppler for Frontend ENV VARS

---

## Frontend Server

## CD to ROOT

#### Install deps

```bash
npm i
```

#### Start Proxy Server

```bash
npm run dev
```

#### Navigate on Browser to `localhost:3000`

---

# Login

All user passwords are 'password' for simplicity.

emails follow permissions and firm name, ie

`admin@react.com`

`manager${number}@${firmnameWithWhitespaceRemoved}.com`

`editor${number}@${firmnameWithWhitespaceRemoved}.com`

`viewer${number}@${firmnameWithWhitespaceRemoved}.com`

---

## Generate Backend Code

NOTE: Backend server must be running to use generation commands.

#### GraphQL hooks and components

```bash
npm run gen:gql
```

#### REST fetchers

```bash
npm run gen:rest
```

---

# After Every Pull

```bash
npm i
npm run gen:gql
npm run gen:rest
```
