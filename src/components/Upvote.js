import React from 'react';
import { useMutation } from "react-query";
import { SlTooltip } from '@shoelace-style/shoelace/dist/react';

export function Upvote({ feature, queryClient }) {

  const updateRecord = () => {
    mutation.mutate({ id: feature['id'], votes: feature['fields']['Votes'] })
  }
  const mutation = useMutation(async ({ id, votes }) => {
    const block_ID = 'app1wpW6ntY1bfwLo';
    const table_name = 'Upvote';
    const updatedRecord = {
      "records": [
        {
          "id": id,
          "fields": {
            "Votes": +votes + 1
          }
        }
      ]
    }

    let url = `https://api.airtable.com/v0/${block_ID}/${table_name}`;
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRecord)
    })
    queryClient.invalidateQueries('airtable')
  });

    return (
      <SlTooltip content="Click to upvote this feature!" placement="top">
        <span onClick={updateRecord} 
          className="hover:text-blue-700">
          <svg className="hover:text-blue-700 fill-current w-full upvoter" 
            xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
          </svg>                      
          Upvote
        </span>
      </SlTooltip>
    )
}