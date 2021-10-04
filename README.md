## Installation

1. Fork the repo and clone it locally
2. Run 'npm install'
3. To start the server, run `npm run dev`

The repo is a Next.js repo. You can read more about Next.js [here](https://nextjs.org/docs)

## Setting up Firestore

**Note** - if you just want to work on non Database related features, at the bottom of `index.tsx` there's an alternative `getServerSideProps` which will return mock data that is identical to the data from the db.

**If you are just working on FE features i'd suggest using this as it saves a lot of setup**

But, if you need to setup the database :-)

1. Go to https://console.firebase.google.com/ and click **Add project**
2. Click on the **Cloud Firestore** button (it's a big orange sqaure on the page) and click on **Create Database**
3. In the wizard, choose **Production mode**
4. Select a location (preferably eu-something..)

Once your database is created, in the sidebar, next to Project overview, there's a Cog icon. Click it, and navigate to **Project settings -> Service accounts**

1. Click on **Generate new private key**
2. Once the key is generated, you will have a button that downloads a json file
3. In the root of the project, create a file called **serviceAccountKey.json** and paste the content of your downloaded json file. **Note: This file is in the .gitignore, but make sure you don't commit it!**
4. run the app (`npm run dev`)
5. The first run of the app will create an initial board in your firebase DB. You can then comment out the lines in `index.tsx` that have the comment `Seed data` above them. (If they are commented out, you'll need to un-comment them and refresh for the seeding to happen)

## Contributing

See [our open issues](https://github.com/uriklar/professor/issues), and thanks for taking a part in this project!

Join our Slack workspace using [this link](https://join.slack.com/t/professorcrew/shared_invite/zt-p75wib6f-KjlwEii0HoCgXyQXFKiYIw)
