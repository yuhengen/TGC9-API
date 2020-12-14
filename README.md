# API Project

## Setup

Uses the following boilerplate files:

1. setupExpress.js
2. setupHBS.js
3. MongoUtil.js
4. User authentication: `passport/setup.js` and `models/UserModel.js`

And we need to have `.env` file with the following settings:
* `MONGO_URL`

## Duplicate Package.json

1. Copy the dependencies to the new package.json
2. yarn install (to install all dependencies)

## Using Advanced REST client

- Install the Advanced REST client
- After setting up a route, use following to READ:
1. Method: GET
2. Request URL: link of route (Make public)

- To CREATE:
1. Method: PASS
2. Request URL: link of route
3. Type in the following:
```
{
 "name":"Lift crash",
  "location":"Lift lobby",
  "tags":"[dangerous]",
  "block":"[360]",
  "reporter_name":"Naruto",
  "reporter_email":"naruto@uzumaki.com",
  "date":"2020-12-07"
}
```

- To UPDATE:
1. Method: PATCH
2. Request URL: link of route/<:id>
3. Type in the following to update:
```
{
 "name":"Lift crash2",
  "location":"Lift lobby2",
  "tags":"[dangerous]",
  "block":"[360]",
  "reporter_name":"Naruto2",
  "reporter_email":"naruto2@uzumaki.com",
  "date":"2020-12-07"
}
```

- To DELETE:
1. Method: DELETE
2. Request URL: link of route/<:id>