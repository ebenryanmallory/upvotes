## Most upvotes

Most-upvotes is the upvoting app used by Motion Storyline to map out feature requests and issues. It was inspired by [Upvoty](https://www.upvoty.com/) and many aspects were copied from the Upvoty demo.

The inspiration for creating an upvoting app was to create a simple upvoting app from Airtable data, and use Airtable as a backend and UI to power the app.

To install the upvoting app locally:

```
git clone https://github.com/ebenryanmallory/most-upvotes.git
cd most-upvotes
npm install or yarn
```

If you want to run this app locally on your own Airtable project, be sure to replace your own block number, table name (or renmae your table), and use your own API key. If you create a .env file, you can set the key as REACT_APP_KEY.

More information on Airtable can be read in their documentation linked from within a project you have created, and I recommend following their setup recommendation on creating a secondary account with a different API key with scopes defined in the main account if you are exposing it the client as is the case with the implementation of this app.


```
npm run start
```

Run locally - the React part uses a standard Create React App setup plus React Query for driving the app data from Airtable and refreshing, and uses CRACO (configuration override) for Tailwind CSS to get up and running quickly.

[MIT](LICENSE)