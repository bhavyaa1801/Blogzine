import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props

}) {
  return (
    <button
      type={type}
      className={`
        px-5 py-2.5 rounded-lg
        font-medium
        ${bgColor} ${textColor}
        hover:opacity-90
        active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-400
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
