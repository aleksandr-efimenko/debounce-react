import { useState, useRef } from 'react'
import { countries } from './countries'
import './App.css'

// set delay for debounce function in milliseconds
const DELAY = 1000

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<string[]>([])
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Your search function (replace with your actual implementation)
  const performSearch = (query: string) => {
    // Your search logic goes here
    console.log(`Searching for: ${query}`)
    const result = countries.filter((country) => country.toLowerCase().includes(query.toLowerCase()))
    console.log(result)
    setSearchResult(result)
  }

  // Debounce function
  function debounce(func, delay: number) {
    return function (...args: []) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => func(...args), delay)
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

  const searchResultEmpty = searchResult?.length === 0
  // get first 20 results
  const searchResultList = searchResult.slice(0, 20).map((c) => <li>{c}</li>)
  return (
    <div>
      <label htmlFor='search-input'>Search:</label>
      <input
        type='text'
        id='search-input'
        value={searchTerm}
        onChange={handleInputChange}
        placeholder='Type to search...'
      />
      {{ searchResultEmpty } && <ul>{searchResultList}</ul>}
    </div>
  )
}
