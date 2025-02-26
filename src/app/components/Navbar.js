import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center w-full h-10  bg-gray-300 text-black p-2'>
      <div>
        <h1>
            Quantemplate
        </h1>
      </div>

      <div>
      <ul className='flex gap-5 px-5'>
            <li>
                Digital clothing Service
            </li>
            <li>
                Digital Clones
            </li>
            <li>
                About
            </li>
            <li>
              Contact
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
