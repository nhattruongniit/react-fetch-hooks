import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=redux');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios(url);
      document.title = 'Fetched data';
      setData(result.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('useEffect'); 
    document.title = 'Fetching';
    fetchData();
  }, [url]);
  

  const handleFetch = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
  }

  return (
    <Fragment>
     <form
        onSubmit={handleFetch}
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
