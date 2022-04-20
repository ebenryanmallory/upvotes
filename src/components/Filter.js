import React from 'react';
import { SlTag } from '@shoelace-style/shoelace/dist/react';

export function Filter({ setTag, filterText }) {

    const handleRemove = (event) => {
      const tag = event.target;
      tag.style.opacity = '0';
      setTag({});
    }

    return (
        <>
            <p>Results filtered by {filterText}: <SlTag size="small" removable onSlRemove={handleRemove}>
            Remove filter
            </SlTag></p>
        </>
    )
}