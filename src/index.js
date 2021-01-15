import { React, useState } from 'react'
import { render } from 'react-dom'
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useMutation
} from "react-query"
import { createClient } from '@supabase/supabase-js'
import './index.css'
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Topics />
    </QueryClientProvider>
  );
}

function FetchSupabase() {
  return useQuery("supabase", async () => {
    let { data } = await supabase
      .from('upvote')
      .select('*')
      .order('votes', { nullsFirst: false, foreignTable: undefined, ascending: false })
    return data;
  });
}

function Topics() {
  const { status, data, error, isFetching } = FetchSupabase(); 
  const [ID, setID] = useState(-1);
  const [filter, setFilter] = useState({ tag: '*', string: '' });

  const mutation = useMutation(async ({name, votes}) => {
    await supabase
      .from('upvote')
      .update({ 'votes': votes + 1})
      .eq('feature_name', name)
    // React-query docs recommend a mutation setting to invalidate the cache
    queryClient.invalidateQueries('supabase')
  });

    return (
      <div className="container px-16 py-16">
        <h1 className="text-center text-2xl text-gray-700 my-8 text-uppercase">Look, we got it wrong.</h1>
        <h4 className="text-center text-gray-700 my-8">Help get us on the right track.</h4>
        <div>
          {status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : ID >= 0 ? (
            <div className="border-solid border shadow-sm p-8 my-8">
              <span className="text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setID({ tag: '*', string: '' })}>Back</span>
              <br />
              <span>{data[ID]['feature_name']}</span>
              <br />
              <span>{data[ID]['feature_description']}</span>
              <br />
              <span>{data[ID]['votes']}</span>
              <br />
              <span>{data[ID]['status']}</span>              
              <br />
              <span>{data[ID]['category']}</span>
              <br />
              <span>{data[ID]['type']}</span>
            </div>
          ) : filter.tag === 'status' || filter.tag === 'category' || filter.tag === 'type' ? (
            data.map((feature) => (
                <div key={uuidv4()}>
                  {filter.tag === 'status' && filter.string === feature['status'] && 
                    <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                      <span key={uuidv4()} className="text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setFilter({ tag: '*', string: '' })}>Back</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{feature['feature_name']}</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{filter.tag}</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{filter.string}</span>
                    </div>
                  }
                  {filter.tag === 'category' && filter.string === feature['category'] && 
                    <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                      <span key={uuidv4()} className="text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setFilter({ tag: '*', string: '' })}>Back</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{feature['feature_name']}</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{filter.tag}</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{filter.string}</span>
                    </div>
                  }
                  {filter.tag === 'type' && filter.string === feature['type'] && 
                    <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                      <span key={uuidv4()} className="text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setFilter({ tag: '*', string: '' })}>Back</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{feature['feature_name']}</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{filter.tag}</span>
                      <br key={uuidv4()} />
                      <span key={uuidv4()}>{filter.string}</span>
                    </div>
                  }
                </div>
              )
            )
          ) : (
            data.map((feature, index) => (
              <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                <h4 key={uuidv4()} className="font-black text-gray-700 hover:text-blue-700 cursor-pointer" onClick={() => setID(index)}>{feature['feature_name']}</h4>
                <div key={uuidv4()}>
                  <p key={uuidv4()}>{feature['feature_description']}</p>
                  <div key={uuidv4()} className="text-center w-max my-4 px-4 bg-gray-100 border border-gray-400 rounded-2xl cursor-pointer">
                    <span key={uuidv4()} onClick={() => { mutation.mutate({ name: feature['feature_name'], votes: feature['votes']}) }} className="hover:text-blue-700">
                      <svg key={uuidv4()} className="hover:text-blue-700 fill-current w-full" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>                      
                      Upvote
                    </span>
                    <hr />
                    <span key={uuidv4()} className="rounded" >{feature['votes']}</span>
                  </div>
                  <div key={uuidv4()} className="flex">
                    <div key={uuidv4()} onClick={() => setFilter({ tag: 'status', string: feature['status'] })} className="flex-initial ml-0 mx-2 my-4 px-4 bg-pink-300 border border-pink-400 rounded text-pink-700 hover:text-pink-900 cursor-pointer">{feature['status']}</div>
                    <div key={uuidv4()} onClick={() => setFilter({ tag: 'category', string: feature['category'] })} className="flex-initial mx-2 my-4 px-4 bg-blue-300 border border-blue-400 rounded text-blue-700 hover:text-blue-900 cursor-pointer">{feature['category']}</div>
                    <div key={uuidv4()} onClick={() => setFilter({ tag: 'type', string: feature['type'] })} className="flex-initial mx-2 my-4 px-4 bg-yellow-500 border border-yellow-600 rounded text-yellow-800 hover:text-yellow-900 cursor-pointer">{feature['type']}</div>
                  </div>
                </div>
                <span>{isFetching ? "Background Updating..." : " "}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
}

render(<App />, document.querySelector("#most-upvotes"));