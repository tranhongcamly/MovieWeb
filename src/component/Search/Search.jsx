import "./style.css"

import ContentSearch from './Content Search/ContentSearch';
import React from 'react'

function Search({t, changeLang}) {
  return (
    <div>
      <ContentSearch t={t} changeLang={changeLang}/>
    </div>
  )
}

export default Search