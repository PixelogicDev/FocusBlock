# FocusBlock

### Be The Most Productive Version Of You.

#### FocusBlock is here to help you stay on track with your tasks.

#### Table Of Contents

1.  [Introduction](#introduction)
2.  [Tech](#tech)
3.  [How to use](#how-to-use)
    1.  [Dashboard](#dashboard)
    2.  [Custom URL](#custom-url)
4.  [Contributing](#contributing)
5.  [Thank you](#thank-you)
6.  [License](#license)

### Introduction

Welcome to FocusBlock! FocusBlock is a web application that was created to help anyone manage their time in a more productive way. FocusBlock helps you take a task and time block it and realize when you are taking longer then expected to complete a task.

The great thing about FocusBlock is that you are able to reach out to someone automatically if you are struggling. If your FocusBlock goes over time and you designate someone's email as a contact, they will recieve a message requesting assistance!

FocusBlock is part of the PixelogicDev 28 Day Projects stream. Visit the channel [here](https://www.twitch.tv/pixelogicdev) to see more projects like this!

### Tech

FocusBlock was built using all Javascript tech in a full stack soluton:<br>
**_Client_**: React v16.3.2<br>
**_Server_**: Node.js v8.9.4<br>
**_Storage_**: MongoDB v3.4.3<br>
**_Note: FocusBlock has only been tested in Google Chrome browser and may have issues on other browsers._**

### How to use

FocusBlock was made with simplicity in mind. There are only two different views, About & Dashboard. The About view will give you a basic overview of FocusBlock and the Dashboard view is where all the magic happens.

#### Dashboard

When you hit the Dashboard view you will be greeted with a form to start creating your first FocusBlock. This form will consist of the following:

- Title: Name of the FocusBlock
- Timer: Amount of time to focus on this task
- Contact (Optional): Email of the person to contact if needed

Once you create your first FocusBlock all you need to do is select "Get Focused" and you can begin working on your task. Once you complete your task make sure to press "Stop Focusing". This is how FocusBlock knows that you are done with your task!

If you do not press "Stop Focusing" before time is complete AND you have someone set as a contact, an email will automatically be sent out to them requesting assistance on your task.

#### Custom URL

FocusBlock uses a database to help store multiple FocusBlocks at a time. Don't worry, all email addresses are stripped from your FocusBlock before saving for privacy purposes. In order for FocusBlock to know which FocusBlocks it needs to pull, a custom URL is generated for you. The first time you go to https://focusblock.stream you will see the url above all your FocusBlocks and it should look like this: `https://focusblock.stream/dashboard/SomeIdHere`.

From that point on, make sure to use that URL to get access to all the FocusBlocks you have already created. When you return, you will need to re-enter any emails for your blocks for the reason stated above.

### Contributing

FocusBlock is an open source application that is looking for contributions! If you are interested in contributing and/or found a bug, please see below to get started with contributing.

#### Github Issues

All contributing will be done through Github Issues. If you have a bug/improvement please create a Github Issue in this repository.

#### MongoDB Storage

FocusBlock uses a MongoDB Database that stores very basic user settings. Here is a list of everything being stored in the database:<br>
`id` -> Custom URL ID<br>
`url` -> Custom URL path for each person<br>
`focusBlocks` -> Array of all focusBlocks<br>

##### Install MongoDB

Make sure to have MongoDB installed before you run it by following [this doc](https://docs.mongodb.com/manual/installation/).

##### Start Database

Before starting up the database make sure to do these commands:

- Open up a terminal window and type `mongod`
- Open up another terminal window and type `mongo`
- In the `mongo` terminal use command `use MyDatabaseName`. This will create a local database (Don't forget to add the name of your db to your server `.env` file).

This setup will only happen the first time around. Every other time after do these commands:

- Open up a terminal window and type `mongod`
- Open up another terminal window and type `mongo`
- In the `mongo` terminal use command `use MyDatabaseName`.

#### Node Server

FocusBlock uses a Node.js server in order to handle communication between the client and database. There are a few environment properties that need to be set before running the server.

##### ENV Properties

Start by creating a `.env` file that will store these properties:

- `BASE_PATH`=localhost
- `PORT`=3000
- `DB_HOST`=localhost:27017
- `DB_NAME`=focusblock

##### Start Server

When you are ready to run the server, follow these commands:

- `cd Server`
- `npm install && npm start`

#### SendGrid

In order to get email working on the client, you will need to create a basic SendGrid account. This will allow SMTP sending via the client. Once you create this account you will need the username and API token.

#### React Client

FocusBlock runs a React client that is simple to get up and running.

##### ENV Properties

There are some properties within the client that are needed to run the app. You will need to create a `.env.development.local` file before starting the app locally:

- `REACT_APP_SMTP_USERNAME` ---> SMTP Username for SMTPJS (From Sengrid)
- `REACT_APP_SMTP_PW` ---> SMTP Password for SMTPJS (From Sengrid)
- `REACT_APP_API_BASE` ---> The route for your Node Server (ex. `http://localhost:8000`)

##### Start Client

When you are ready to run the client, follow these commands:

- `cd focus-block`
- `npm install`
- `npm start`
- Visit `localhost:3000`

This will run and build the client. At this point you are good to go with the client side.

### Thank you

I want to give a huge shout out to all the libraries I was able to use to make this project possible:<br>
[`body-parser`](https://github.com/expressjs/body-parser)<br>
[`cors`](https://github.com/expressjs/cors)<br>
[`dotenv`](https://github.com/motdotla/dotenv)<br>
[`express`](https://github.com/expressjs/express)<br>
[`mongodb`](https://github.com/mongodb/mongo)<br>
[`shortid`](https://github.com/dylang/shortid)<br>
[`classnames`](https://github.com/JedWatson/classnames)<br>
[`node-sass-chokidar`](https://github.com/michaelwayman/node-sass-chokidar)<br>
[`npm-run-all`](https://github.com/mysticatea/npm-run-all)<br>
[`react`](https://github.com/facebook/react)<br>
[`smtpjs`](https://smtpjs.com/)<br>
[`SendGrid`](https://sendgrid.com/)<br>

### License

Copyright 2018 Pixelogic

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
