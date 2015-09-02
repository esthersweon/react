# React Tutorial

There is a simple node server implementation included. It simply serves static files from `public/` and handles requests to `tweets.json` to fetch or add data. 


### To Start Server

```sh
npm install
node server.js
```

Visit <http://localhost:3000/>.


### To Compile JSX to Vanilla Javascript

```sh
npm install -g react-tools
jsx --watch src/ build/scripts/
```
