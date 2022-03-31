import {React,useEffect,useState} from 'react'
import { motion } from 'framer-motion';

import {Movie, Sidebar, MovieModal} from './'


const MovieList = ({movies, setShowModal,setSelectedmv}) => {
  const stars = (i) =>{
    i = i/2
    i = Math.floor(i)
   
    if(i > 5){i = 5 }
    let starArr = '⭐';
    for(i>0; i--;){
      starArr += '⭐'
    }
    return (
      <div className="flex">
        {starArr}
      </div>
    )
  }
  const movieCard= (id, title, img_path, desc, rating) => {
  // https://image.tmdb.org/t/p/w500/${img_path}
  // https://image.tmdb.org/t/p/w200//aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg
  // const bgImg = "bg-[url('https://image.tmdb.org/t/p/w200"+img_path+"')]"
  

    const card1 = (
      <motion.div layout key={id} className={"w-[16rem] h-max relative flex flex-col justify-end min-w-min rounded-lg border-2 border-white"}>
        <img id="background-img" src={'https://image.tmdb.org/t/p/w500'+img_path} alt="" className="w-max object-cover rounded-lg" />
            <button
              className="text-3xl text-white flex justify-center absolute top-[0%] left-[85%] bg-black bg-opacity-50 p-2 rounded-tr-lg rounded-bl-lg "
              type="button"
              onClick={() => {
                setShowModal(true) 
                setSelectedmv(title)
              }}
            >
              <i className="fas fa-bookmark "></i>
            </button>
        <div className={" w-full group rounded-t-xl flex flex-col absolute bottom-0 px-2 py-1 bg-black  bg-opacity-50 "}>
          <div className="h-1/2 m-0 flex justify-between items-baseline"  href="#!" > {/* add black fill with trasparency */ }
            <div id="title-rating w-3/4">
              <h5 className="text-white text-md font-bold" >{title.length <= 15 ? title : title.slice(0,15)+'...'}</h5>
              <div className=" flex justify-around">
                <p className="text-gray-400 font-medium text-md">rating</p>
                {stars(rating)}
              </div>
            </div>
            {/* <div className="text-xl text-white flex justify-center items-baseline" id="bookmark">
                
            </div> */}
            {/* <button
              className="text-xl text-white flex justify-center items-baseline shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-bookmark"></i>
            </button> */}
            
          </div>
          <div className=" invisible group-hover:visible h-0 group-hover:h-5/6 hover:flex text-white transition-all p-2">
            <p className="  font-normal text-xl">
              {desc.length <= 93 ? desc : desc.slice(0,93)+' ...'}
            </p>
          </div>
        </div>
      </motion.div>
    )
    
    return(
     card1
    )
  }
  
  

  return (
    <div className="container px-5 py-15 mx-auto backdrop-opacity-10">
      
      
      {/* border-2 border-gray-200 */}
      <div className="flex items-baseline">
        <p className="text-2xl text-slate-300"> Movies</p>
        <p className="text-ellipsis text-slate-300">...</p>
      </div>
      <div className="h-full border-opacity-60 rounded-lg overflow-hidden ">
        <div className="container flex flex-col justify-center py-10 mx-auto justify-items-center ">
       
          <motion.div className="grid  grid-flow-rows grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]  gap-x-2 gap-y-9 justify-items-center  ">          
            
            {
              movies.map((mv)=>{return movieCard(mv.id, mv.title, mv.poster_path, mv.overview, mv.vote_average) })

            }

            
          </motion.div>
        </div>
      </div>
        
    </div>
  )
}

export default MovieList