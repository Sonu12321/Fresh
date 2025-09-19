import React from 'react'

const SearchBar = ({query,setQuery,onSearch}) => {
  return (
    <>
    <div className='flex m-2 space-x-2'>
        <input 
        type='text'
        placeholder='write it over here'
        value={query}
        onChange={(e) =>{setQuery(e.target.value)}}
        className='flex-1  block w-full p-4 py-5 ps-10 text-lg text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500  '
        />
<button className='bg-blue-400 px-4 py-3 rounded' type ='button' 
onClick={onSearch}>
    Search
</button>
    </div>
    </>
  )
}

export default SearchBar