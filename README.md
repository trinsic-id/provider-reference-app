# Trinsic's Provider Reference App
This demo shows how to use Trinsic's Provider API to manage organizations under your Trinsic account.
It is a Node.js Express app which makes Trinsic Provider API calls with our service client.

## Use Case
This sample is to simulate a dashboard to manage organizations in your Trinsic Studio account.

## Prerequisites:
- [npm](https://www.npmjs.com/get-npm)

## Setup 

### Download project and install dependencies 
1. Clone the repository
- `git clone https://github.com/streetcred-id/provider-reference-app`
2. Navigate into the directory
- `cd provider-reference-app`
3. Install the dependencies
- `npm install`
4. Open up the project in a code editor of your choice
5. Rename the `.env-template` file to `.env`
![empty .env](assets/emptyEnv.png)
 
### Retrieve your Provider Key
1. Go to <a href="https://studio.trinsic.id" target="_blank">Trinsic Studio</a> and login or create an account.
2. Click on the account dropdown in the top-right of the screen and select the **Provider Keys** link.
3. Click the **+ NEW KEY** button and enter a name for the key. Then click on the **CREATE** button.
![token screen](assets/token.png) 
4. **COPY THE KEY** and paste it into the `PROVIDER_TOKEN` value in the .env file. You will not be able to see this key once the slider is closed, so be sure to copy it.

## Run the web app
 
### Start and use the application
1. Run with npm.
`npm start`
2. Open the web app on <a href="http://localhost:3000" target="_blank">localhost:3000</a>.
![fill in passport](assets/webApp.png)
3. Enter a name for a new organization, select a network, and click **CREATE ORGANIZATION**.
    - It might take a few seconds to create the organization and refresh the table on the right.
4. Copy an organization Access Token to the clipboard by clicking on the token.
5. Assign an organization a new Access Token by clicking on its refresh button.
6. Delete an organization by clicking on its red trash button.

> Contact <support@trinsic.com> for any questions. 
