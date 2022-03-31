import React from "react";

export default function MovieModal({showModal, setShowModal, currentWL, selectedmv, setBookmarked, sessionStore, setSessionStore}) {

  const closeModal=()=>{
    setShowModal(false)
  }

  const handleSession = (id, title,selectedmv) => {
    // setSessionStore((prevState)=> [{"id":id,"title":title,"bookmarked_movies":[selectedmv]},...prevState])
   let tempStore = sessionStore;
   let newStore;
   tempStore.length <= 0 && tempStore.push({"id":id,"title":title,"bookmarked_movies":[selectedmv]})
   tempStore.every((s)=>{
      if(s['id']===id ){
        if(s['bookmarked_movies'].includes(selectedmv)){
          console.log('')
        }else{
          s['bookmarked_movies'].push(selectedmv)
          setSessionStore(tempStore)
          return false;
        }
          

      }else{
          newStore= [{"id":id,"title":title,"bookmarked_movies":[selectedmv]},...tempStore]
          setSessionStore(newStore)
          return false;
      }
      
   })
   
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center w-screen h-screen fixed bottom-1/2 right-1/2 items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl" >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-[30rem] bg-white outline-none focus:outline-none" onBlurCapture={()=> setShowModal(false)}>
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Watch Lists
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-20 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    {/* <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"> */}
                      ×
                    {/* </span> */}
                  </button>
                </div>
                {/*body*/}
                <div className="m-2">
                    {`Add ${selectedmv || 'untitled'} to: `}
                </div>
                <div className="relative p-6 h-[10rem] overflow-y-scroll scroll-m-1 flex flex-col">
                  
                  {
                    currentWL.map((wl,idx)=>(
                      <p 
                        key={idx}
                        role='button'
                        className="my-4 text-blueGray-500 text-lg leading-relaxed cursor-pointer"
                        onClick={()=>{
                          // alert(`added ${selectedmv} to ${wl.title}`)
                          setBookmarked((prevState)=> prevState = [selectedmv,wl.title])
                          handleSession(wl.id, wl.title, selectedmv)
                          closeModal()
                          
                        }}
                      >
                        {!wl.hidden && wl.title}
                      </p>
                    ))
                  }
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}