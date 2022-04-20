import { React, useState } from 'react'
import { FeatureBox } from './components/FeatureBox';
import { Filter } from './components/Filter';
import { SlButton, SlIcon } from '@shoelace-style/shoelace/dist/react';

export function Features({ FetchAirtable, queryClient }) {

    const fetchData = FetchAirtable();
    const { status, isLoading } = fetchData;
    let data = [];
    if ( isLoading === false && status === 'success') {
      data = fetchData.data.records
    }

    const [feature_id, setFeature_id] = useState(-1);
    const [tag, setTag] = useState({});
  
    const CSS = `
      .tags-removable sl-tag {
        transition: var(--sl-transition-medium) opacity;
      }
      .upvoter {
        margin-bottom: -0.4rem;
      }
      sl-button.back-button::part(base) {
        border-radius: 0.4rem;
        border-color: #ff7ac1;
        box-shadow: 0 2px 10px #0002;
      }
    
      sl-button.back-button::part(base):hover {
        background-color: #ff7ac1;
        color: white;
      }
    `;

      return (
        <div className="container p-2 m-auto">
          <style>{CSS}</style>
          { (tag['Status'] || tag['Category'] || tag['Type']) &&
            <Filter 
              filterText={`${Object.keys(tag).find(key => tag[key] !== null).toLowerCase()}`}
              setTag={setTag} />
          }
          { feature_id >= 0 &&
            <SlButton onClick={() => setFeature_id(-1)} 
              className="cursor-pointer back-button text-gray-700" 
              variant="default" size="small">
              <SlIcon slot="prefix" name="backspace"></SlIcon>
              Back
            </SlButton>
          }
          { feature_id >= 0 ? (
            <FeatureBox
              feature={data[feature_id]}
              setFeature_id={setFeature_id}
              setTag={setTag}
              queryClient={queryClient} />
          ) : tag['Status'] ? (
              data.sort((a, b) => b['fields']['Votes'] - a['fields']['Votes'])
              .filter(feature => feature['fields']['Status'] === tag['Status'])
              .map((feature, index) => (
                <div key={feature + index}>
                    <FeatureBox
                      feature={feature}
                      setFeature_id={setFeature_id}
                      setTag={setTag}
                      queryClient={queryClient}
                      index={index} />
                </div>
              ))
            ) : tag['Category'] ? (
              data.sort((a, b) => b['fields']['Votes'] - a['fields']['Votes'])
              .filter(feature => feature['fields']['Category'] === tag['Category'])
              .map((feature, index) => (
                <div key={feature + index}>
                  <FeatureBox
                    feature={feature}
                    setFeature_id={setFeature_id}
                    setTag={setTag}
                    queryClient={queryClient}
                    index={index} />
                </div>
              ))
            ) : tag['Type'] ? (
              data.sort((a, b) => b['fields']['Votes'] - a['fields']['Votes'])
              .filter(feature => feature['fields']['Type'] === tag['Type'])
              .map((feature, index) => (
                <div key={feature + index}>
                  <FeatureBox
                    feature={feature}
                    setFeature_id={setFeature_id}
                    setTag={setTag}
                    queryClient={queryClient}
                    index={index} />
                </div>
              ))
            ) : (
              data.sort((a, b) => b['fields']['Votes'] - a['fields']['Votes'])
                .map((feature, index) => (
                  <div key={feature + index}>
                    <FeatureBox
                      feature={feature}
                      setFeature_id={setFeature_id}
                      setTag={setTag}
                      queryClient={queryClient}
                      index={index} />
                  </div>
                ))
            )
        }
        <p className="text-right">View on <a 
          href="https://airtable.com/shrWDAeJIw7O4IjwP/tblRuJIglQwPRJXoX"
          target="_blank" rel="noreferrer">
          Airtable</a>
        </p>
        </div>
      );
  }