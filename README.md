# Redux Shopping Cart

A React and Redux learning project for asynchronous product and cart operations. The application uses Redux Thunk and a local JSON Server API.

[Actions](src/redux/actions.js) call `http://localhost:3001/products` and `/cartItems`; [the reducer](src/redux/reducer.js) maintains separate request, success, and failure state for product and cart operations. [db.json](db.json) supplies the local API data.

## Run locally

```sh
npm ci
npx json-server db.json --port 3001
```

In a second terminal:

```sh
npm run dev
```

The cart writes to the local JSON Server data. This is a state-management exercise with no authentication, payment processing, or automated tests. The checked-in action code uses the local API rather than a direct Fake Store API connection.
