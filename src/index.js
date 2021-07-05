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
import { Modal } from './Modal';

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
      .not('votes', 'eq', '-1')
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
    // TODO: React-query docs recommend a useMutation setting for handling cache invalidation
    queryClient.invalidateQueries('supabase')
  });

    return (
      <div className="container p-2 m-auto">
        <div>
          {status === "loading" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : ID >= 0 ? (
            <div className="border-solid border shadow-sm p-8 my-8">
              <p 
                className="text-gray-700 hover:text-blue-700 cursor-pointer" 
                onClick={() => setID({ tag: '*', string: '' })}>
                Back
              </p>
              <br />
              <div className="flex">
                <div className="h-full text-center w-max px-4 bg-gray-100 border border-gray-400 rounded-2xl cursor-pointer">
                  <span className="hover:text-blue-700" onClick={() => { mutation.mutate({ name: data[ID]['feature_name'], votes: data[ID]['votes']}) }}>
                    <svg key={uuidv4()} className="hover:text-blue-700 fill-current w-full" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>
                    Upvote
                  </span>
                  <hr />
                  <span key={uuidv4()} className="rounded">{data[ID]['votes']}</span>
                </div>
                <br />
                <div>
                  <span className="px-10 flex-1 font-black text-gray-700">{data[ID]['feature_name']}</span>
                  <br />
                  <div key={uuidv4()} className="px-10 flex">
                    <span 
                      onClick={() => { setID({ tag: '*', string: '' }); setFilter({ tag: 'status', string: data[ID]['status'] }) }} 
                      className="flex-initial ml-0 mx-2 my-4 px-4 bg-pink-300 border border-pink-400 rounded text-pink-700 hover:text-pink-900 cursor-pointer whitespace-nowrap">
                      {data[ID]['status']}
                    </span>              
                    <span 
                      onClick={() => { setID({ tag: '*', string: '' }); setFilter({ tag: 'category', string: data[ID]['category'] }) }} 
                      className="flex-initial mx-2 my-4 px-4 bg-blue-300 border border-blue-400 rounded text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                      {data[ID]['category']}
                    </span>
                    <span 
                      onClick={() => { setID({ tag: '*', string: '' }); setFilter({ tag: 'type', string: data[ID]['type'] }) }} 
                      className="flex-initial mx-2 my-4 px-4 bg-yellow-500 border border-yellow-600 rounded text-yellow-800 hover:text-yellow-900 cursor-pointer whitespace-nowrap">
                      {data[ID]['type']}
                    </span>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={ {__html: data[ID]['feature_description']} }/>
                <br />
              </div>
            </div>
          ) : filter.tag === 'status' || filter.tag === 'category' || filter.tag === 'type' ? (
            data.map((feature, index) => (
                <div key={uuidv4()}>
                  {filter.tag === 'status' && filter.string === feature['status'] && 
                    <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                      <span 
                        key={uuidv4()} 
                        className="text-gray-700 hover:text-blue-700 cursor-pointer" 
                        onClick={() => setFilter({ tag: '*', string: '' })}>
                        Back
                      </span>
                      <br key={uuidv4()} />
                      <span 
                        key={uuidv4()} 
                        className="font-black text-gray-700 hover:text-blue-700 cursor-pointer" 
                        onClick={() => { setFilter({ tag: '*', string: '' }); setID(index) }}>
                        {feature['feature_name']}
                      </span>
                      <br key={uuidv4()} />
                      <div className="flex">
                        <span 
                          key={uuidv4()} 
                          className="flex-initial ml-0 mx-2 my-4 px-4 bg-pink-300 border border-pink-400 rounded text-pink-700">
                          {filter.string}
                        </span>
                      </div>
                    </div>
                  }
                  {filter.tag === 'category' && filter.string === feature['category'] && 
                    <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                      <span 
                        key={uuidv4()} 
                        className="text-gray-700 hover:text-blue-700 cursor-pointer" 
                        onClick={() => setFilter({ tag: '*', string: '' })}>
                        Back
                      </span>
                      <br key={uuidv4()} />
                      <span 
                        key={uuidv4()} 
                        className="font-black text-gray-700 hover:text-blue-700 cursor-pointer" 
                        onClick={() => { setFilter({ tag: '*', string: '' }); setID(index) }}>
                        {feature['feature_name']}
                      </span>
                      <br key={uuidv4()} />
                      <div className="flex">
                        <span 
                          key={uuidv4()} 
                          className="flex-initial mx-2 my-4 px-4 bg-blue-300 border border-blue-400 rounded text-blue-700">
                          {filter.string}
                        </span>
                      </div>
                    </div>
                  }
                  {filter.tag === 'type' && filter.string === feature['type'] && 
                    <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                      <span 
                        key={uuidv4()} 
                        className="text-gray-700 hover:text-blue-700 cursor-pointer hover:text-blue-700 cursor-pointer" 
                        onClick={() => setFilter({ tag: '*', string: '' })}>
                        Back
                      </span>
                      <br key={uuidv4()} />
                      <span 
                        key={uuidv4()} 
                        className="font-black text-gray-700 hover:text-blue-700 cursor-pointer" 
                        onClick={() => { setFilter({ tag: '*', string: '' }); setID(index) }}>
                        {feature['feature_name']}
                      </span>
                      <br key={uuidv4()} />
                      <div className="flex">
                        <span key={uuidv4()} className="flex-initial mx-2 my-4 px-4 bg-yellow-500 border border-yellow-600 rounded text-yellow-800">{filter.string}</span>
                      </div>
                    </div>
                  }
                </div>
              )
            )
          ) : (
            data.map((feature, index) => (
              <div key={uuidv4()} className="border-solid border shadow-sm p-8 my-8">
                <div key={uuidv4()} className="flex">
                  <div key={uuidv4()} className="h-full text-center w-max px-4 bg-gray-100 border border-gray-400 rounded-2xl cursor-pointer">
                    <span key={uuidv4()} onClick={() => { mutation.mutate({ name: feature['feature_name'], votes: feature['votes']}) }} className="hover:text-blue-700">
                      <svg key={uuidv4()} className="hover:text-blue-700 fill-current w-full" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>                      
                      Upvote
                    </span>
                    <hr />
                    <span key={uuidv4()} className="rounded">{feature['votes']}</span>
                  </div>
                  <div key={uuidv4()}>
                    <h4 key={uuidv4()} className="px-10 flex-1 font-black text-gray-700 hover:text-blue-700 cursor-pointer" 
                      onClick={() => setID(index)}>
                        {feature['feature_name']}
                    </h4>
                    <div key={uuidv4()} className="px-10 flex">
                      <div key={uuidv4()} 
                        onClick={() => setFilter({ tag: 'status', string: feature['status'] })} 
                        className="flex-initial ml-0 mx-2 my-4 px-4 bg-pink-300 border border-pink-400 rounded text-pink-700 hover:text-pink-900 cursor-pointer whitespace-nowrap">
                        {feature['status']}
                      </div>
                      <div key={uuidv4()} 
                        onClick={() => setFilter({ tag: 'category', string: feature['category'] })}
                        className="flex-initial mx-2 my-4 px-4 bg-blue-300 border border-blue-400 rounded text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                          {feature['category']}
                      </div>
                      <div key={uuidv4()} 
                        onClick={() => setFilter({ tag: 'type', string: feature['type'] })}
                        className="flex-initial mx-2 my-4 px-4 bg-yellow-500 border border-yellow-600 rounded text-yellow-800 hover:text-yellow-900 cursor-pointer whitespace-nowrap">
                          {feature['type']}
                      </div>
                    </div>
                  </div>
                  <div key={uuidv4()}>
                    <div key={uuidv4()} dangerouslySetInnerHTML={ {__html: feature['feature_description']} } />
                  </div>
                </div>
                <span>{isFetching ? "Background Updating..." : " "}</span>
              </div>
            ))
          )}
        </div>
        <p id="modal-trigger" className="cursor-pointer	fixed bottom-2.5 right-2.5" onClick={() => document.querySelector('.modal-container').classList.toggle('hidden')}>Login / Signup</p>
        <div className="hidden modal-container">
          <Modal className="hidden" />
        </div>
      </div>
    );
}

render(<App />, document.querySelector("#most-upvotes"));