import React, { useEffect } from 'react'

const ResourseList = () => {
    useEffect(async ()=>{
        const data = await fetch('https://swapi.dev/api/people/');
        console.log(data)
    },[])
  return (
    <div>ResourseList</div>
  )
}

export default ResourseList