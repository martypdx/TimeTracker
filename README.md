# Time Tracker

## Description

This API was designed with habit-builders in mind. It can help you identify where your time is being spent in the activities you regularly enagage with, and assist you in aligning that awareness with the achievement of bigger goals.


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

The user object contains an `_id`, `username`, a hashed `password`, the user's `activities` and `domains`.  The `activities` and `domains` keys have values of an object with properties that are the user's stored activities with a value of the number of target hours per week. 

Example: 

```
{
    "_id": userId,
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
### Timeblock routes
Timeblocks may be created, retreived, edited and deleted using this API.

All requests must include the Authorization token in the headers:

`{"Authorization": token}`

#### Time block object

Time blocks hold information related to a given block of time.  The object contains an `_id`, `userId` which references a user , `startTime` (required), `endTime`, `description` (required), `activity` and `domain` fields. 

Example: 
```
{
    "_id": timeblockId, 
    "userId": userId, 
    "startTime": "2016-11-17T07:00:00.000Z",
    "endTime": "2016-11-17T19:00:00.000Z",
    "description": "Dishman community pool"
    "activity": "swimming",
    "domain": "health"
}
```
#### Create a timeblock

`POST /api/timeblocks`

To create a timeblock send a reqeust with a body that includes the fields of the timeblock to be created, except the `userId`.

Include the token in the Authorization header. 

The `startTime` and `description` fields are required to create the timeblock. 

{
    "startTime": "2016-11-10T07:00:00.000Z",
    "endTime": "2016-11-10T08:00:00.000Z",
    "description": "Dishman community pool",
    "activity": "swimming"
}


#### Get all timeblocks for a given user

`GET /api/timeblocks`

Include the token in the header to retrieve all timeblocks associated with the current user. 

#### Get one timeblockId

`GET /api/timeblocks/:id`

Include the timeblock id (`_id`) in the path to access a specific timeblock.  The timeblock must be associated with the current user. 

#### Edit a timeblock

`PUT /api/timeblocks/:id`

Include a JSON object with the fields to be changed and the value to which those fields should be changed.

Example:

`{"description": "swimming at Dishman Pool with Emily"}`

The response will contain the newly updated object. 


Include the timeblock id (`_id`) in the path to access a specific timeblock.  The timeblock must be associated with the current user. 

#### Delete a timeblock

`DELETE /api/timeblocks/:id` 

Include the timeblock id (`_id`) in the path to delete a specific timeblock.  The timeblock must be associated with the current user. 

The response will contain the deleted object. 


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
