# Uploadly

## Description

This is a SPA where users can view documents that were created and uploaded by users with admin rights.

## User Stories

-  **404:** As an anon/user I want to see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- **500:**
-  **Signup:** As a user I want to sign up to the platform so I can upload documents and create users.
-  **Login:** As a user/admin I want to log in to the platform so I can see my documents.
-  **Logout:** As a user I want to logout from the platform so no one else can see my documents.
-  **Create users:** As an admin I want to create users so I can share documents with them, and they can access their docs.
-  **List users:** As an admin I want to list users so I can access their profiles to see their current documents.
-  **Users profile:** As an admin I want to see users profiles so I can upload files to their profiles.
-  **Upload document** As an admin I want to upload a document and preview documents assigned to a user.
-  **User profile** As a user I want to see what documents I have in my profile.
-  **Document detail** As a user I want to review a document so I can understand what the document is about.


## Backlog

-  **Document comments:** As a user I want to comment on the documents so that I can ask for changes if they are required.
-  **See the app description** As a user I want to see a description of the uses of the app.
-  **Document delete** As an admin I want to delete documents if there's a wrong file upload.
-  **User delete** As an admin I want to delete users so the database is up to date. 
-  **Document status** As a user I want to see when a certain document was last updated or uploaded.
-  **User status** As an admin I want to know when a user last logged in to know whether an account has gone stale. 


Emails:
- Receive new user notification.

File upload from users:
- Upload files with modifications.

Search bar:
- Search for documents.

Notifications:
- Receive notifications when there's a new comment.
- Post comments/feedback (users).
- Receive notification of comments (admin).
- Reply to the comments (admin/user).
- Display the communication threads.
- Limit the threads to the most current 5.
- "See more".
  
# Client

## Routes

- / - Homepage (public)
- /login - login form (anon)
- /signup - signup form (admin)
- /user/create - show user create form (admin)
- /dashboard - users list (admin)
- /user/:id - user document list (admin)
- /user/:id/document/create - documents create (admin)
- /user/:id/document/:id - document detail (admin)
- /profile/me - document list (user)
- /profile/me/document/:id - document detail (user)


## Pages

- Homepage
- Log in page
- Sign up page
- Dashboard page
- User create form page
- User profile page
- Document detail page
- 404 Page
- 500 Page

## Components

- User Card component
  - Input: user: any
  - Shows user name, number of documents.
- Document component
  - Input: document
  - Shows document (title: string, type: string)


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Document Service
  - document.list()
  - document.create(data)
  - document.detail(id)
- User Service
  - user.list()
  - user.create(data)
  - user.profile(id)

# Server

## Models

User model

```
username - String // required
password - String // required
role - String [enum: 'admin', 'user']
createdBy: ObjectID<User> 
```

Document model

```
recipient - ObjectID<User> // required
uploadedBy - ObjectID<User> // required // default : currentUser
name - String // required
description - String // required
type - String [enum: 'contract', 'proposal', 'presentation', 'survey']
```

## API Endpoints/Backend Routes

- GET /
- GET /auth/me 
  - requires user
- POST /auth/signup
  - requires anon
  - body:
    - username
    - password
  - creates user with admin rights
  - returns user
- POST /auth/login
  - requires anon
  - body:
    - username
    - password
- POST /user/create
 - requires admin
 - body:
    - username
    - password
    - admin id
    - created on
  - create user
  - returns user
- GET /user
  - requires admin
  - returns all users created by the currentUser
- GET /user/:id
  - requires admin
  - validate valid id
  - validate if user exists and was created by currentUser

POST /user/:id/document/create
  - requires admin
  - validate valid id
  - validate if user exists and was created by currentUser
  - body:
    - name
    - recipient
    - type
    - lastUpdate
    - uploadedBy
  - upload file
  - create doc
  - returns doc
  
- GET /user/:id/document/:id/detail
  - requires user
  - validate valid user id, document id, document is owned by the recipient (user id)
- GET /profile/me
  - validate valid id
  - validate if user exists and was created by currentUser
  - requires user
- GET /profile/me/document/:id
  - validate valid user id, document id, document is owned by the recipient (user id)
  - validate if user exists and was created by currentUser
  - requires user
- POST /auth/logout
  - requires user
  - validate if user exists and was created by currentUser
  - body: (empty)



## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
