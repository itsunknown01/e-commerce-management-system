import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='relative flex items-center px-2 py-2 w-60 gap-3 text-sm text-gray-600'>
      <div className="absolute inset-0 rounded-[19px] bg-gray-100 border border-gray-300" />
      <Search className='w-4 h-4 mr-2 z-10' />
      <input
        type="text"
        className="relative z-10 bg-transparent border-none outline-none min-w-[43px]"
        placeholder="Search"
      />
    </div>
  )
}

export default SearchBar