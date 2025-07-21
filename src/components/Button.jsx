import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props    //other attributes like placeholder (in input:text)
}) => {
  return (
    <button type={`${type}`} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button
