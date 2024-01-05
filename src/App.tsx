import { useState, useRef } from 'react'
import { countries } from './countries'
import './App.css'

// set delay for debounce function in milliseconds
const DELAY = 1000

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<string[]>([])
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Search function
  const performSearch = (query: string) => {
    if (query.length === 0) {
      setSearchResult([])
      return
    }
    const result = countries.filter((country) => country.toLowerCase().includes(query.toLowerCase())).sort()
    setSearchResult(result)
  }

  // Debounce function
  function debounce(func, delay: number) {
    return function (...args: []) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => {
        func(...args)
        debounceTimeout.current = null
      }, delay)
    }
  }

  // Debounced search function
  const debouncedSearch = debounce(performSearch, DELAY)

  // Event handler for input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchTerm(value)
    debouncedSearch(value)
  }
  const delayMessage = (
    <>
      <p>Delay in effect while typing... </p> <p>Search will run after 1 second of inactivity.</p>
    </>
  )
  const searchResultEmpty = searchResult?.length === 0
  // get first 20 results
  const searchResultList = searchResult.slice(0, 10).map((c) => <li key={c}>{c}</li>)
  return (
    <div className='flex flex-col gap-5'>
      <div className='h-12'>{debounceTimeout.current && delayMessage}</div>
      <div className='flex gap-5 items-center h-24'>
        <label htmlFor='search-input' className='text-xl'>
          Search:
        </label>
        <input
          className='border-2 border-gray-300 rounded-md px-3 py-2 text-lg'
          type='text'
          id='search-input'
          value={searchTerm}
          onChange={handleInputChange}
          placeholder='Type to search...'
        />
        <div className='w-12'>{debounceTimeout.current && <LoadingCircle />}</div>
      </div>
      <div className='h-64'>
        {{ searchResultEmpty } && <ul className='text-left list-disc list-inside text-lg'>{searchResultList}</ul>}
        {searchResultEmpty && searchTerm.length > 0 && !debounceTimeout.current && (
          <div className='text-lg animate-pulse'>No results found</div>
        )}
      </div>
    </div>
  )
}

function LoadingCircle() {
  return (
    <svg
      className='animate-spin h-12 w-12 text-gray-700'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle className='opacity-50' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
      <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
    </svg>
  )
}
