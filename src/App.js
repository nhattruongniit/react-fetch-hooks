import React, { Fragment, useState } from 'react';
import './App.css';
import { useCustomHooks } from './useCustomHooks';

const App = () => {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, handleFetch } = useCustomHooks(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  const onSubmit = (e) => {
    handleFetch(e, `http://hn.algolia.com/api/v1/search?query=${query}`)
  }

  return (
    <Fragment>
     <form
        onSubmit={onSubmit}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      { isError && <div>Something went wrong ...</div> }
      
      { isLoading ? (
        <div>Loading ...</div>
      ) : (
          <ul>
          { 
            data.hits.map(item => (
              <li key={item.objectID}>
                <span>{item.title}</span>
              </li>
            ))
          }
          </ul>
        )
      }
     
    </Fragment>
    
  )
}

export default App;
