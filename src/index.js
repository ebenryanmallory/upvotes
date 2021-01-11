import { React, useState } from 'react'
import { render } from 'react-dom'
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import { createClient } from '@supabase/supabase-js'
import './index.css'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <Features />
    </QueryClientProvider>
  );
}

function FetchFeatures() {
  return useQuery("lists", async () => {
    let { data } = await supabase
    .from('upvote')
    return data;
  });
}

function Features() {
  const { status, data, error, isFetching } = FetchFeatures(); 
  const [ID, setID] = useState(-1);

    return (
      <div className="container px-16 py-16">
        <h1 className="text-center text-2xl text-gray-700 my-8 text-uppercase">Look, we got it wrong.</h1>
        <h4 className="text-center text-gray-700 my-8">We are painfully aware. Help get us on the right track.</h4>
        <div>
          {status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : ID >= 0 ? (
            <div className="border-solid border shadow-sm p-8 my-8">
              <span className="text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setID(-1)}>Back</span>
              <br />
              <span>{data[ID]['feature_name']}</span>
              <br />
              <span>{data[ID]['feature_description']}</span>
              <br />
              <span>{data[ID]['votes']}</span>
              <br />
              <span>{data[ID]['tag']}</span>
            </div>
          ) : (
            data.map((feature, index) => (
              <div className="border-solid border shadow-sm p-8 my-8">
                <h4 key={index} className="font-black text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setID(index)}>{feature['feature_name']}</h4>
                <div>
                  <p key={index + 1}>{feature['feature_description']}</p>
                  <div className="text-center w-max my-4 px-4 bg-gray-100 border border-gray-400 rounded-2xl cursor-pointer">
                    <span className="hover:text-blue-700">
                      <svg className="hover:text-blue-700 fill-current w-full" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>                      
                      Upvote
                    </span>
                    <hr />
                    <span key={index + 2} className="rounded" >{feature['votes']}</span>
                  </div>
                  <div key={index + 3} className="w-max	px-4 bg-pink-300 border border-pink-400 rounded text-pink-700 hover:text-orange-700 cursor-pointer">{feature['tag']}</div>
                </div>
                <span>{isFetching ? "Background Updating..." : " "}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
}

render(<App />, document.querySelector("#root"));