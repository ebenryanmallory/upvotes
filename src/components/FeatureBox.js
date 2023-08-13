import React from 'react';
import { Upvote } from './Upvote';

export function FeatureBox({ feature, setFeature_id, index, setTag, queryClient }) {

    return (
      <div className="border-solid border shadow-sm p-8 my-8">
        <div className="flex">
          <div className="h-20 flex-initial text-center px-4 py-2.5 bg-gray-100 hover:bg-gray-50 border border-gray-400 rounded-2xl cursor-pointer">
            <Upvote
              feature={feature}
              queryClient={queryClient} />
            <hr />
            <span className="rounded">{feature['fields']['Votes']}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="px-4 font-black text-gray-700 hover:text-pink-500 cursor-pointer" 
              onClick={() => setFeature_id(index)}>
                {feature['fields']['Name']}
            </h4>
            <div className="px-4 flex flex-wrap">
              <div onClick={() => setTag({ Status: feature['fields']['Status'],
                                            Category: null,
                                            Type: null })}
                className="flex-initial my-1 px-4 mr-2 bg-pink-300 border border-pink-400 rounded text-pink-700 hover:text-pink-900 cursor-pointer whitespace-nowrap">
                {feature['fields']['Status']}
              </div>
              <div onClick={() => setTag({ Category: feature['fields']['Category'],
                                            Type: null,
                                            Status: null })}
                className="flex-initial my-1 px-4 mr-2 bg-blue-300 border border-blue-400 rounded text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                  {feature['fields']['Category']}
              </div>
              <div onClick={() => setTag({ Type: feature['fields']['Type'],
                                          Category: null,
                                          Status: null })}
                className="flex-initial my-1 px-4 mr-2 bg-yellow-500 border border-yellow-600 rounded text-yellow-800 hover:text-yellow-900 cursor-pointer whitespace-nowrap">
                  {feature['fields']['Type']}
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={ {__html: feature['fields']['Description']} } 
            className="flex-1 px-2">
          </div>
        </div>
      </div>
    )
}