import { useEffect } from "react";

import React from 'react'

const Filter = ({unfiltered, setFiltered,activeGenre, setActiveGenre}) => {
  const genres = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
  }
  useEffect(() => {
    if(activeGenre === 0){
      setFiltered(unfiltered);
      return;
    }
    const filtered = unfiltered.filter((mv) => (mv.genre_ids.includes(activeGenre)))
    setFiltered(filtered)
  },[activeGenre] )

  return (
    <div className="flex justify-start p-4 ">
        <button id={activeGenre === 0 ? "active-btn" : ""} className="flex justify-center m-2 px-3 text-white active:text-slate-900 active:bg-white active:border-slate-900 rounded-xl border-2 border-white" onClick={()=> setActiveGenre(0)}> All </button>
        <button id={activeGenre === 35 ? "active-btn" : ""} className="flex justify-center m-2 px-3 text-white active:text-slate-900 active:bg-white active:border-slate-900 rounded-xl border-2 border-white" onClick={()=> setActiveGenre(35)}> Comedy </button>
        <button id={activeGenre === 28 ? "active-btn" : ""} className="flex justify-center m-2 px-3 text-white active:text-slate-900 active:bg-white active:border-slate-900 rounded-xl border-2 border-white" onClick={()=> setActiveGenre(28)}> Action </button>
    </div>
  )
}

export default Filter;