import React from 'react'

const Input = ({type,name,value,placeholder,onChange}) => {
  return (
    <div className='flex justify-center items-center gap-4'>
    
    {
      type != "checkbox" && <label htmlFor={name}>
      {
        name
      } :
    </label>
    }

      <input type={type} name={name} value={value} placeholder={placeholder} className='border border-gray-400 rounded-sm' onChange={onChange} />

    {
      type == "checkbox" && 
        placeholder
    }

    </div>
  )
}

export default Input
