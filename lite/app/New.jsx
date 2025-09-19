import React, { useRef, useState } from 'react'

export const New = () => {
  const [query,setQuery] = useState("")
  const [result,setResult] = useState([])
  const [loading,setLoading] = useState(false)

  const cache = useRef({})
  const debounceRef = useRef(null)

  const fetchdata = async (searchTerm) => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.datamuse.com/words?ml=${searchTerm}`)
      const data = await response.json()
      return data.map((item) => item.word)
    } catch (error) {
     console.log("Error")
     return [] 
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(async() => {
        if(value.trim() === "")
        {
          setResult([])
          return
        
      }
      if(cache.current[value]){
        console.log(`cache hit ${value}`)
        setResult(cache.current[value])
      }else {
        console.log(  `API Call 🔄 ${value}`);
        const data = await fetchdata(value);
        cache.current[value] = data; // Save in cache
        setResult(data);
      }
      },500)
  }
  return (
    <div>
      <p>Welcome to the search Box</p>
      <input type='text' placeholder='typesometing here' className='p-4 w-32' onChange={handleChange}/>
      <ul>
        {result.map((item,index)=>(
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default New
