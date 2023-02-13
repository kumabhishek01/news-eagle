import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  let pageSize=9;
  let apiKey=process.env.REACT_APP_NEWS_API_KEY
  const [progress, setProgress] = useState(0);

  
    return (
      <div>
      <Router>
      {/* #f11946 */}
      <LoadingBar
        color='red' 
        progress={progress}
        height={3}
      />
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' category='general'/>}></Route>
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} key='entertainment' category='entertainment'/>}></Route>
          <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='health' category='health'/>}></Route>
          <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='science' category='science'/>}></Route>
          <Route exact path='/sports' element={<News setProgress={setProgress}  pageSize={pageSize} key='sports' category='sports'/>}></Route>
          <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='technology' category='technology'/>}></Route>
        </Routes>
        
      </Router>
      
       
      </div>
    )
}

export default App