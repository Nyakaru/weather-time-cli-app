# weather-time-cli-app

Simple command line weather and time app.

## Description

**weather-time-cli-app** is the our solution for getting weather and time of different locations.


## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [GCP](https://cloud.google.com) - Google cloud platform
- [Dark Sky API ](https://darksky.net/dev/docs) - The Dark Sky API allows you to look up the weather anywhere on the globe, returning (where available)

### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Clone the repository by running the command

  ```[bash]
  git clone https://github.com/Nyakaru/weather-time-cli-app.git
  ```

- Run `cd weather-time-cli-app` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  yarn install
  ```
- Create the `.env` file by running `cp .env.sample .env`
- Populate the env file created above by obtaining valid values for the environment variables.
- In order to use the  [Dark Sky API](https://darksky.net/dev/docs), you first need your own API key. Don't worry, getting an      API key is quick and free. All you need to do is go to the website and click "Try for Free" to create an account.
- Also getting a [GCP key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) is quite simple. Click on     the link sign up and create a service account key.
- Replace the `DARK_SKY_API_KEY` and `GCP_KEY` in the `.env` with your own api keys respectively.
- Source the `env variables` by running `source.env`
- Start the application by running
  ```
  yarn dev austin boston 10005
  ```
  The application should now be running


### More about environmental variables and running the app

After setting up your `.env` from the template provided in the `env/.env.sample` file;
to use these environment variables anywhere in the app, simply:

```[js]
process.env.MY_ENV_VARIABLE
```

When running the application you can provide locations/postal codes of your own choice

```
yarn dev **locations/postal codes**
```

## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests and integration tests.
To execute all tests, run the command

```
  yarn test 
```
