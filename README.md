# backend

before star run ``npm i`` first.

To start the web api
``npm run start`` or ``npm run dev``

## List routes 

### 1. /register 

method **POST**.

request body example: 
```
{
    "name":"carolline",
    "email":"carolline@gmail.com",
    "username":"carolline",
    "password":"password"
}
```
success response example:
```
{
    "message": "Successfully Registered",
    "name": "carolline",
    "username": "carolline",
    "email": "carolline@gmail.com",
    "password": "$2a$12$jOvPohL8Vd4FA0XVW5AGxOSaXvFCIpbwAzx0/FNOJfTvK0ZhF.9xG"
}
```
    
### 2. /login
method **POST**.

request body example: 
```
{
    "email": "carolline@gmail.com",
    "password": "password"
}
```
success response example:
```
{
    "error": false,
    "message": "Success",
    "result": {
        "id": 15,
        "name": "carolline"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsIm5hbWUiOiJjYXJvbGxpbmUiLCJpYXQiOjE2ODY5MTkyOTYsImV4cCI6MTY4NzE3ODQ5Nn0.jSewW-oKoIeA9Z7RUno4g68rLTODenlS3zi8Xbi2vew"
}
```
### 3. updateprofile/:id
method **PATCH**.

request body example: 
```
{
    "name": "djuliana",
    "username": "djuliana",
    "email": "djuliana@gmail.com",
    "password": "password"
}
```
success response example:
```
{
    "id_user": 6,
    "name": "djuliana",
    "username": "djuliana",
    "email": "djuliana@gmail.com",
    "password": "$2a$12$VNaV2.dkf74W6w5GSBmBwOMFeNMC.T8c4ekUHrFsQG8RKeO6ypN1a"
}
```

### 4. /deleteuser/:id
method **DELETE**.

request body example: 
```

```
success response example:
```
Account has been deleted
```

### 5. /user/:id
method **GET**.

request body example: 
```

```
success response example:
```
{
    "id_user": 16,
    "name": "carolline2",
    "username": "carolline2",
    "email": "carolline2@gmail.com"
}
```

### 6. /test
method **POST**.

request body example: 
```
{
"A1":1,
"A2":0,
"A3":0,
"A4":1,
"A5":1,
"A6":1,
"A7":1,
"A8":1,
"A9":1,
"A10":1,
"Q_score":7,
"toddler_age":23,
"gender":"wanita",
"ethnicity":"melayu",
"jaundice":"no",
"family_with_ASD":"no",
"who_test":"family"

}
```
success response example:
```
{
    "message": "Saving the test",
    "A1": 1,
    "A2": 0,
    "A3": 0,
    "A4": 1,
    "A5": 1,
    "A6": 1,
    "A7": 1,
    "A8": 1,
    "A9": 1,
    "A10": 1,
    "Q_score": 7,
    "toddler_age": 23,
    "gender": "wanita",
    "ethnicity": "melayu",
    "jaundice": "no",
    "family_with_ASD": "no",
    "who_test": "family"
}
```

### 7. /alltest
method **GET**.

request body example: 
```

```
success response example:
```
[
    {
        "id_test": 1,
        "id_user": 2,
        "A1": true,
        "A2": false,
        "A3": true,
        "A4": true,
        "A5": true,
        "A6": false,
        "A7": true,
        "A8": true,
        "A9": false,
        "A10": true,
        "Q_score": 7,
        "gender": "wanita",
        "ethnicity": "melayu",
        "jaundice": "no",
        "family_with_ASD": "no",
        "who_test": "family",
        "user": {
            "name": "olin",
            "username": "olin",
            "email": "olin123@gmail.com"
        }
    },
    {
        "id_test": 3,
        "id_user": 2,
        "A1": true,
        "A2": false,
        "A3": true,
        "A4": true,
        "A5": true,
        "A6": false,
        "A7": true,
        "A8": true,
        "A9": false,
        "A10": true,
        "Q_score": 7,
        "gender": "wanita",
        "ethnicity": "melayu",
        "jaundice": "no",
        "family_with_ASD": "no",
        "who_test": "family",
        "user": {
            "name": "olin",
            "username": "olin",
            "email": "olin123@gmail.com"
        }
    },
    {
        "id_test": 4,
        "id_user": 16,
        "A1": true,
        "A2": false,
        "A3": false,
        "A4": true,
        "A5": true,
        "A6": true,
        "A7": true,
        "A8": true,
        "A9": true,
        "A10": true,
        "Q_score": 7,
        "gender": "wanita",
        "ethnicity": "melayu",
        "jaundice": "no",
        "family_with_ASD": "no",
        "who_test": "family",
        "user": {
            "name": "carolline2",
            "username": "carolline2",
            "email": "carolline2@gmail.com"
        }
    }
]
```

### 8. /gettest/:id
method **GET**.

request body example: 
```

```
success response example:
```
[
    {
        "id_test": 4,
        "id_user": 16,
        "A1": true,
        "A2": false,
        "A3": false,
        "A4": true,
        "A5": true,
        "A6": true,
        "A7": true,
        "A8": true,
        "A9": true,
        "A10": true,
        "Q_score": 7,
        "gender": "wanita",
        "ethnicity": "melayu",
        "jaundice": "no",
        "family_with_ASD": "no",
        "who_test": "family",
        "user": {
            "name": "carolline2",
            "username": "carolline2",
            "email": "carolline2@gmail.com"
        }
    }
]
```

### 9. /test/:id_user/:id_test
method **GET**.

request body example: 
```

```
success response example:
```
{
    "id_test": 4,
    "id_user": 16,
    "A1": true,
    "A2": false,
    "A3": false,
    "A4": true,
    "A5": true,
    "A6": true,
    "A7": true,
    "A8": true,
    "A9": true,
    "A10": true,
    "Q_score": 7,
    "gender": "wanita",
    "ethnicity": "melayu",
    "jaundice": "no",
    "family_with_ASD": "no",
    "who_test": "family",
    "user": {
        "name": "carolline2",
        "username": "carolline2",
        "email": "carolline2@gmail.com"
    }
}
```

### 10. /deletetest/:id_user/:id_test
method **DELETE**.

request body example: 
```

```
success response example:
```
Test has been deleted
```

### 11. /profiledetectionresult/:id_user/:id_test
method **GET**.

request body example: 
```
{
    "detection_result":"no"
}
```
success response example:
```
{
    "id_user": 16,
    "id_test": 5,
    "detection_result": "no",
    "createdAt": "2023-06-16T13:42:19.000Z",
    "user": {
        "name": "carolline2",
        "username": "carolline2",
        "email": "carolline2@gmail.com"
    }
}
```
### 12. /detection/:id_user/:id_test
method **GET**.

request body example: 
```

```
success response example:
```
{
    "id": 2,
    "id_user": 16,
    "id_test": 5,
    "detection_result": "no",
    "createdAt": "2023-06-16T13:42:19.000Z",
    "updatedAt": "2023-06-16T13:42:19.000Z",
    "userIdUser": null,
    "testIdTest": null,
    "user": {
        "name": "carolline2",
        "username": "carolline2",
        "email": "carolline2@gmail.com"
    }
}
```

### 13. /alldetection
method **GET**.

request body example: 
```

```
success response example:
```
[
    {
        "id": 2,
        "id_user": 16,
        "id_test": 5,
        "detection_result": "no",
        "createdAt": "2023-06-16T13:42:19.000Z",
        "updatedAt": "2023-06-16T13:42:19.000Z",
        "userIdUser": null,
        "testIdTest": null,
        "user": {
            "name": "carolline2",
            "username": "carolline2",
            "email": "carolline2@gmail.com"
        }
    }
]
```

### 14. /detection/:id_user
method **GET**.

request body example: 
```

```
success response example:
```
[
    {
        "id": 2,
        "id_user": 16,
        "id_test": 5,
        "detection_result": "no",
        "createdAt": "2023-06-16T13:42:19.000Z",
        "updatedAt": "2023-06-16T13:42:19.000Z",
        "userIdUser": null,
        "testIdTest": null,
        "user": {
            "name": "carolline2",
            "username": "carolline2",
            "email": "carolline2@gmail.com"
        }
    }
]
```

### 15. /deletedetection/:id_user/:id_test
method **DELETE**.

request body example: 
```

```
success response example:
```
Detection autism has been deleted
```

### 16. /allpost
method **GET**.

request body example: 
```

```
success response example:
```
[

    {
        "id_post": 15,
        "id_user": 14,
        "post": "Anak-anak kita memang berbeda, tetapi itu yang membuat mereka spesial bunda",
        "sum_like": 0,
        "createdAt": "2023-06-16T07:51:00.000Z",
        "updatedAt": "2023-06-16T07:51:00.000Z",
        "userIdUser": null,
        "user": {
            "name": "naya",
            "username": "naya",
            "email": "naya@gmail.com"
        }
    },
    {
        "id_post": 16,
        "id_user": 7,
        "post": "sedih mengetahui anak saya mempunyai indikasi autisme, tapi saya senang mengetahui banyak teman disini yang mempunyai perjuangan serupa",
        "sum_like": 0,
        "createdAt": "2023-06-16T07:53:41.000Z",
        "updatedAt": "2023-06-16T07:53:41.000Z",
        "userIdUser": null,
        "user": {
            "name": "rookie",
            "username": "rookie",
            "email": "rookie@gmail.com"
        }
    },
    {
        "id_post": 17,
        "id_user": 7,
        "post": "tetap semangat  anak kita berkat dari Tuhan",
        "sum_like": 0,
        "createdAt": "2023-06-16T07:54:21.000Z",
        "updatedAt": "2023-06-16T07:54:21.000Z",
        "userIdUser": null,
        "user": {
            "name": "rookie",
            "username": "rookie",
            "email": "rookie@gmail.com"
        }
    },
    {
        "id_post": 18,
        "id_user": 12,
        "post": "Anak saya ternyata sangat pintar dalam melukis, sungguh senang dititipkan anak dengan bakat seperti ini",
        "sum_like": 0,
        "createdAt": "2023-06-16T07:56:03.000Z",
        "updatedAt": "2023-06-16T07:56:03.000Z",
        "userIdUser": null,
        "user": {
            "name": "testing",
            "username": "test",
            "email": "test@gmail.com"
        }
    }
]
```

### 17. /post/:id_user
method **GET**.

request body example: 
```

```
success response example:
```
[
    {
        "id_post": 18,
        "id_user": 12,
        "post": "Anak saya ternyata sangat pintar dalam melukis, sungguh senang dititipkan anak dengan bakat seperti ini",
        "sum_like": 0,
        "createdAt": "2023-06-16T07:56:03.000Z",
        "updatedAt": "2023-06-16T07:56:03.000Z",
        "userIdUser": null,
        "user": {
            "name": "testing",
            "username": "test",
            "email": "test@gmail.com"
        }
    }
]
```

### 18. /post/:id_user/:id_post
method **GET**.

request body example: 
```

```
success response example:
```
{
    "id_post": 18,
    "id_user": 12,
    "post": "Anak saya ternyata sangat pintar dalam melukis, sungguh senang dititipkan anak dengan bakat seperti ini",
    "sum_like": 0,
    "createdAt": "2023-06-16T07:56:03.000Z",
    "user": {
        "name": "testing",
        "username": "test",
        "email": "test@gmail.com"
    }
}
```

### 19. /createpost
method **POST**.

request body example: 
```
{
    "post":"test post"
}
```
success response example:
```
{
    "message": "Status Updated",
    "id_user": 16
}
```

### 20. /like_post/:id_post
method **PATCH**.

request body example: 
```

```
success response example:
```
{
    "message": "add like"
}
```

### 21. /unlike_post/:id_post
method **PATCH**.

request body example: 
```

```
success response example:
```
{
    "message": "unlike"
}
```
### 22. /deletepost/:id_user/:id_post
method **DELETE**.

request body example: 
```

```
success response example:
```
Status has been deleted
```
### 23. /upfoto/:id_user
method **POST**.

request body example: 
```
form data
key : photo 
value : example.jpg
```
success response example:
```
{
    "id_user": "16",
    "name": "carolline2",
    "url": "https://storage.googleapis.com/foto-profile/foto_profil_carolline2.jpg"
}
```
### 24. /getfotoprofile/:id_user
method **GET**.

request body example: 
```

```
success response example:
```
{
    "id_user": "16",
    "name": "carolline2",
    "url": "https://storage.googleapis.com/foto-profile/foto_profil_carolline2.jpg"
}
```
