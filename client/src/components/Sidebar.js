import React, { useState, useEffect } from 'react'
import {motion} from 'framer-motion'

import { TrashCan,ReelIco,DeleteIco,TapeIco, } from '.'

const Sidebar = ({toggleFullDiv, setToggleFullDiv,setCurrentWL, bookmarked, watchlists,setWatchlists, sessionStore, setSessionStore}) => {
  const [toggleReel, setToggleReel] = useState(null)
  const [testwatchLists,  setTestWatchLists] = useState([
    {'title': "Action",
      'hidden':false,
      'bookmarkedMovies': [//{'hidden':false,'name': 'Hunter X'},
      //                       {'hidden':false,'name': 'Space X'},
      //                       {'hidden':false,'name': 'Orbit X'}
                          ]
    },
    {'title': "Drama",
      'hidden':false,
      'bookmarkedMovies': [//{'hidden':false,'name': 'X marks the spot'},
                            // {'hidden':false,'name': 'X-perience'},
                            // {'hidden':false,'name': 'Gone X'}
                          ]
    },
    {'title': "Scifi",
      'hidden':false,
      'bookmarkedMovies': [//{'hidden':false,'name': 'Xpanse'},
                            // {'hidden':false,'name': 'eXtent'},
                            // {'hidden':false,'name': 'Star Trek X'},
                            // {'hidden':false,'name': 'eXtinction'}
                          ]
    }
  ])

  
  // update bookmarked movies with new bookmark
  useEffect(()=>{
    watchlists.map((wl)=>{
      if(wl.title === bookmarked[1]){
        wl.bookmarked_movies.push({'hidden':false,'name': `${bookmarked[0]}`})
        console.log(wl)
      }
    })
    
    console.log(sessionStore)
    
    if(sessionStore.length > 0){
      // console.log('updating...')
      // sessionStore.map((ss)=>{handleUpdate(ss.id)});
      handleUpdate()
      setSessionStore([]);
    }

  }, [bookmarked])

  // update currWL 
  useEffect(()=>{
    setCurrentWL(watchlists)
  },[watchlists])

   

  // watch for click on sidebar header div
  useEffect(()=>{

    if(document.readyState === 'complete') {
        let  newSideBar= "hidden  md:flex md:flex-col "
        let  sideBar= document.querySelector('#main-sidebar-content')
        let cn = sideBar.childNodes
        sideBar.className = newSideBar+(toggleFullDiv ? "" : "h-0")
        cn.forEach((ch)=>{
          // console.log(ch.className)
          let tcn = ch.className;
          ch.className = tcn + (toggleFullDiv ? "" : " hidden");
          // console.log(ch.className)

        })
        
      }
  }, [toggleFullDiv])


  // handlers
  const handleRequest = async(options) => {
    const base = 'http://localhost:5000/api/v1/watchlists'
    const response = await fetch(`${base}/${options.pathId ? options.pathId : ''}`,{
                                  method: options.method,
                                  body: JSON.stringify(options.data),
                                  // mode:'cors',
                                  headers: {"Content-type": "application/json; charset=UTF-8"},
                                });
    const responseData = await response.json();
    return responseData;
  }
  const handleData = (data) =>{
    
    const newObj = {}
    data.map((obj,idx)=>{
      newObj[idx] = obj
    })
    console.log("newJb",newObj)
    return newObj;
    
  }
  const handleUpdate= async(id)=>{
      // const data = handleData(sessionStore);
      const data = sessionStore;
      console.log(data)
      const options = {pathId:'updates',data:data, method:'PUT'}
      const res = await handleRequest(options);
      console.log('updated!',res)
  }

  const handleAdd = async(e)=>{
    e.preventDefault() 
    console.log('',e)
    const inVal = document.querySelector('#sidebar-add-content-input input')
    console.log(inVal.value)
    const data = {"title":`${inVal.value ? inVal.value : 'Unnamed List'}`}
    const options = {data:data, method:'POST'}
  
    const result = await handleRequest(options)
    setWatchlists((prevState)=>[result[0],...prevState])
    
    // const response = await fetchwatchlists('POST',data)
    inVal.value = ''
    console.log('res:',result)
  };

  const handleDelete = (cid) => {
    setWatchlists((prevState) => {
      let temparr = []
      prevState.map((i,idx)=>{
        if(idx === cid){
          i.hidden = true
        }
        return temparr.push(i)
      })
      return temparr
      // prevState[cid].hidden = true

    })
    // watchLists[cid].hidden = true; 
    console.log(watchlists)
  }


  const MovieContent = ({cid, movie}) =>(
    <div id={`watchlist-list-movie_content${cid}`} className=" flex flex-col mx-2 my-2 ">
      <div id="watchlist-list-movie_title" className="flex justify-between w-full mt-2 items-baseline">
          <i className="fa fa-dot-circle-o" aria-hidden="true">{`♟️ ${movie.length <= 8 ? movie : movie.toString().slice(0,7)+'...'}`}</i>
        <div id="delete-icon" className="w-3 h-3 flex items-baseline">
          {/* <span> */}
            <DeleteIco /> 
          {/* </span> */}
        </div>
      </div>
    </div>
  )
  
  const Watchlist = ({cid, content}) => (
    
      <motion.div id={`watchlist-${cid}`} className=" flex flex-col h-auto justify-around group" >
        <div id="watchlist-list-header" className="flex justify-between w-full items-baseline">
          <div id="watchlist-list-name" className=" w-[5rem] flex cursor-pointer" onClick={()=> setToggleReel((prevState)=> prevState===cid ? null : cid)}>
            <div id="watchlist-list-id">
              {`${cid+1}. `}
            </div>
            <div id="watchlist-list-text" className="ml-2">
              {` ${content.title}`}
            </div>
          </div>
          <div 
            className="flex flex-col justify-around m-2  w-max items-baseline " 
            id={`watchlist-list-movie_count-${cid}`} 
            onClick={()=> {
              // setShowList((prevState)=> !prevState)
              // setActiveList(cid)
              }}
            >
            <div className="flex justify-around items-baseline ">
              <p id="count-icon" className="w-3 h-3 items-baseline">
                {toggleReel===cid ? <ReelIco/> : <TapeIco />}
              </p>
              <p> : {content.bookmarked_movies.length > 0  ? content.bookmarked_movies.length : ''}</p> 
            </div>
            
          </div>
          <div id="delete-icon" className="w-3 h-3" onClick={()=>{ 
            handleDelete(cid);
            }}
          >
            <TrashCan />
          </div>
          
        </div>
        <div id="watchlist-list-content-movies" className={toggleReel===cid ? 'flex flex-col' : 'hidden'}>
          {content.bookmarked_movies.length > 0 ? content.bookmarked_movies.map((m)=> (<MovieContent cid={cid} movie={m} />)) : ''}
        </div>
       
      </motion.div>

  )
  
  const FullDiv = ()=>(
   
    <motion.div className="  text-white flex flex-col border-2 mx-4 mt-[4.5rem] border-white md:w-max ">
      {/* onClick={()=> setToggleFullDiv((prevState) => !prevState)} */}
      <div id="toggle-ico" className=" flex justify-center m-2  cursor-pointer" onClick={()=> setToggleFullDiv((prevState) => !prevState)} >
        <p className={"hidden  md:flex text-xl font-medium mx-2 justify-center"} >
          Watchlists
        </p>
        <p className={"text-xl font-medium mx-2 flex justify-center"}>
          🍿
        </p>
      </div>
      <motion.div layout id="main-sidebar-content" className="hidden  md:flex md:flex-col ">
      {/* h-[50%] overflow-y-scroll scroll-m-1 */}
        <div className={` text-white h-max max-h-[15rem] flex flex-col mt-2 mx-4 p-2 border-2 border-white `} id="sidebar-show-content">
          <div id="content-list" className="overflow-y-scroll scroll-mx-0 scroll-smooth ">
            
            {/* {watchLists.map((list,i)=>(
              !list.hidden &&  (<Watchlist cid={i} key={i} content={list} /> )
            ))
            } */}
            { watchlists.map((list,i)=>(
              <Watchlist cid={i} key={i} content={list} /> 
            ))
            }
          </div>
        </div>
        <div className="  flex flex-col mx-4 justify-center" id="sidebar-add-content">
          <p id="sidebar-add-content-text">
            New Watchlist
          </p>
          <form action='post' target='' className="flex flex-col justify-center items-center">
            <div id="sidebar-add-content-input" className="w-max border-2 border-white ">
              <input type="text" name="bookmark" className="bg-black bg-opacity-30" f />
            </div>
            <div  id="sidebar-add-content-submit" className="w-max">
              <button formAction='POST' type="submit" onClick={(e)=>{
                handleAdd(e);
              }}
              > Add </button>
            </div>
            
          </form>
        </div>
      </motion.div>
      
    </motion.div>
  );

  return (
  
    <FullDiv /> 
  )
}

export default Sidebar;