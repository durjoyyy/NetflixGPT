import React from 'react'
import GPTMovieSuggestions from './GPTMovieSuggestions';
import GPTSearchBar from './GPTSearchBar';

const GPTSearch = () => {
  return (
    <div>
      <GPTSearchBar/>
      <GPTMovieSuggestions/>
    </div>
  )
}

export default GPTSearch
