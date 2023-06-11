# [ChatItUp v1 (Beta)](https://chat-it-up-theta.vercel.app/)
## _Chat Application using Next.js_

ChatItUp is an open source free to use chat application using NextJs framework.
The Tech stack used in the application:
- Reactjs (Frontend)
- MongoDB Atlas Cloud (Database)
- NextJs (Web Framework)

## Features

The beta version of the application includes the features such as:
- User authentication using `next-auth`.
- Add chat partners.
- Chat functionality.
- Receive and send chat requests to other people.
- User profile page.

## Prerequisite to run the project
You need to have a MongoDB Atlas cluster for the project.
Sign In or Sign Up on [MongoDB Atlas](https://account.mongodb.com/account/login) and create a database cluster.
You will receive an URI for your cluster, save it.

## To run the project
1. Clone the git repository into your desired directory
    ```
    git clone https://github.com/vidushi-rastogi/chatItUp-next-app.git
    ```
2. Rename the file `.env.template` to `.env`, and add the following project environment variables.
```
MONGODB_URI={YOUR_MONGODB_CLUSTER_URI}
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET={ANY_SECRET_KEY_STRING}
```
3. Install all the npm packages using `npm i`.
4. Run the project using `npm run start`.

And that's all you have to do to run the chat application, enjoy and play around with it.
## Deployed Project
Currently the project is deployed using _Vercel_ platform on [ChatItUp](https://chat-it-up-theta.vercel.app/).
You can check it out and know how it works. Always open for suggestions for improvement, please email on vidu1998rastogi@gmail.com.