
// imports
import { useEffect, useState } from 'react';
import './App.css';


// components
import {Bookmark,LandingPage,Sidebar,MovieList,Filter, Logo, Navbar, MovieModal} from './components'

function App() {
  
  const [popular, setPopular] = useState([]);
  const [watchlists, setWatchlists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [toggleFullDiv, setToggleFullDiv] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [bookmarked, setBookmarked] = useState([]);
  const [currentWL, setCurrentWL] = useState([])
  const [selectedmv, setSelectedmv] = useState('')
  const [sessionStore, setSessionStore] = useState([])
  

  // watchers
  useEffect(() => {
    
    fetchpopular();
    fetchwatchlists()
   

  }, []);

  const fetchpopular = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=2c4630dff587c5d6d263dc65e886a3d1&language=en-US&page=1');
    const movies = await data.json();
    console.log(movies)
    setPopular(movies.results)
    setFiltered(movies.results)
    console.log('pop', popular)
    
  };

  
  const fetchwatchlists = async(method, body)=>{
    
    const base = 'http://localhost:5000/api/v1/watchlists'
    const response = await fetch(`${base}/`,{
                                  method: method,
                                  body: JSON.stringify(body),
                                  mode:'cors',
                                  headers: {"Content-type": "application/json; charset=UTF-8"}
                                });
    const data = await response.json();
    console.log('data',data.rows);
    const res = await data.rows;
    setWatchlists(res.reverse());
  

  };

  
  // show loading page on load
  if(showLanding) {return <LandingPage setShowLanding={setShowLanding}/>}
  console.log(showLanding)
  return (
    // 2xl:w-screen xl:w-full lg:w-full
    <div className="container max-w-screen-2xl min-w-[320px] bg-slate-900   bg-auto relative">
      <div className="xl:w-full lg:w-1/2 md:w-full sm:w-full border-gray-200 border-opacity-60 rounded-lg sticky top-0 z-10 mb-2" id="navbar">
        <Navbar/>
      </div>
      <div className="m-4 scroll-mt-4">
        <MovieModal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          currentWL={currentWL} 
          selectedmv={selectedmv} 
          setBookmarked={setBookmarked}
          sessionStore={sessionStore}
          setSessionStore={setSessionStore}
        />
        <Filter 
          unfiltered={popular} 
          setFiltered={setFiltered} 
          activeGenre={activeGenre} 
          setActiveGenre={setActiveGenre} 
        />
        <div className="w-full h-full flex justify-between" id="main-container">
          <div id= "movies-list"className="w-3/4 border-red-600" >
            <MovieList 
              movies={filtered} 
              setShowModal={setShowModal} 
              setSelectedmv={setSelectedmv} 
            />
          </div>
          <div id="side-bar" className="w-max h-max flex text-white sticky top-20" >
            <Sidebar 
              toggleFullDiv={toggleFullDiv} 
              setToggleFullDiv={setToggleFullDiv} 
              setCurrentWL={setCurrentWL} 
              bookmarked={bookmarked} 
              watchlists={watchlists}
              setWatchlists={setWatchlists}
              sessionStore={sessionStore}
              setSessionStore={setSessionStore}
            /> 
          </div>
        </div>
      </div>
      
      
      
    </div> 
  );
}

export default App;
