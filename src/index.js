import { React } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from "react-query";
import { Features } from './Features';

import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.73/dist/');
// setBasePath('build/shoelace/assets');

const queryClient = new QueryClient();

function FetchAirtable() {
  return useQuery("airtable", async () => {
    const block_ID = 'app1wpW6ntY1bfwLo';
    const table_name = 'Upvote';
    let url = `https://api.airtable.com/v0/${block_ID}/${table_name}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`
      }
    })
    const fetchData = await response.json();
    return fetchData;
  })
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Features
        FetchAirtable={FetchAirtable}
        queryClient={queryClient} />
    </QueryClientProvider>
  );
}

const container = document.querySelector("#upvotes");
const root = createRoot(container);
root.render(<App tab="home" />);