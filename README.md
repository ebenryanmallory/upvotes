## Most upvotes

Most-upvotes is the upvoting app used by Motion Storyline to map out feature requests and issues. It was inspired by [Upvoty](https://www.upvoty.com/) and many aspects were copied from the Upvoty demo.

The inspiration for creating an upvoting app was to try out Supabase by building a simple React app. In order for the app to work you will need to set up a backend and is configured to work with Supabase. You will need to place your URL and key into the code after you create an account to make the app work.

To install the upvoting app locally:

```
git clone https://github.com/ebenryanmallory/most-upvotes.git
cd most-upvotes
npm install or yarn
```

Create a .env file and place an entry in for your URL and one for your key:

```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_KEY=
```
More information on this can be found in the [Supabase docs:](https://supabase.io/docs/client/initializing)

More on the Supabase JS client library can be found [here:](https://supabase.io/docs/client/installing)

```
npm run start
```

Run locally - the React part uses a standard Create React App setup with a CRACO (configuration override) for Tailwind CSS. This was done to get up and running quickly and was not optimized.

[MIT](LICENSE)