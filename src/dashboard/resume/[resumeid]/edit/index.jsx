import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

function EditResume() {
        const params= useParams();
    useEffect(()=>{
  console.log(params.resumeid);
   },[])
  return (   
     <div className='grid grid-cols-1 md:grid-cols-2 p-10 gp-14'>
     
    </div>
  )
}

export default EditResume
