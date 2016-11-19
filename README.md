# Time Tracker

## Description

TODO: Add program description.

## Code Example

```
// TODO: Code example goes here.
```

## Motivation

This was written as a project for Code Fellows 401 class.

## API Reference



### Auth

The Time Trackers API supports signup, signin and a call to validate the user's token.  All auth routes are prefixed by `/api/auth`. 

#### Sign up
To send a signup request. 
`POST /api/auth/signup` 
The request body should contain a JSON object containing `username` and `password` keys. 
Example: 
```
    {
    "username": "myusername", 
    "password": "mypassword"
    }
```

The response object will contain the user's token.
`{"token": "asdfghjklasdfghjklasdfghjkl"}`

#### Sign in 
To send a sign in request:
`POST /api/auth/signin`
Send `username` and `password` in JSON object. Example: 
```
    {
    "username": "myusername", 
    "password": "mypassword"
    }
```

The response object will contain the user's token.
`{"token": "asdfghjklasdfghjklasdfghjkl"}`

#### Validate token
To validate user token:
`POST /api/auth/validate`

Include an `Authorization` in the headers property that hold the token as its value. 

`{"Authorization": token}`


### User routes

The Time Trackers API supports GET and PUT requests for one user.  All auth routes are prefixed by `/api/users`. 

All requests must include the Authorization token in the headers:

`{"Authorization": token}`


#### The user object

The user object contains a `username`, a hashed `password`, the user's `activities` and `domains`.  The `activities` and `domains` keys have values of an object with properties that are the user's stored activities with a value of the number of target hours per week. 

Example: 

```
{
    "username": username,
    "password": hashedpassword,
    "activities" {
        "running": 3,
        "yoga": 2,
        "chores": 5
    }, 
    "domains" : {
        "health": 10,
        "professional": 50
    }
}
```


#### GET user

To retrieve the user object for a user with a valid token: 

`GET /api/users`

All requests must include the Authorization token in the headers:

`{"Authorization": token}`

#### Edit user

To edit the user object's `activities` or `domains` properties: 

`PUT /api/users`

`PUT` requests are not currently supported for the  `username` and `password` properties.  

Include the properties to add or update on the user object along with their new values. Removing an activity or domain from the user object entirely is not supported.  

Example: 
```
{
    "activities": {
        "running": 5
    }

    "domains" {
        "professional": 40,
        "art": 10
    }
}
```

All requests must include the Authorization token in the headers:

`{"Authorization": token}`

`PUT` request return the modified user object in the response. 

### API route/example 2

`// TODO: example code here.`

TODO: Description here.

## Tests

The accompanying test suite can be run using the 'npm test' command.

## Contributors

[Mark Greenwood](https://github.com/markgreenwood)

[Caitlin Araldi](https://github.com/caraldi)

[Erica Hendricks](https://github.com/elhendricks)

[Nathan Pickard](https://github.com/nathanpickard)

## License

The MIT License (MIT)
Copyright (c) 2016 Time Trackers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
