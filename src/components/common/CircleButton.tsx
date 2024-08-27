import React from 'react'

interface CircleButtonProps {
  onClick: () => void,
  children?: React.ReactNode
}

export default function CircleButton({
  onClick,
  children = null
} : CircleButtonProps) {
  return (
    <span onClick={onClick} className='rounded-full w-12 h-12 bg-secondary items-center justify-center inline-flex cursor-pointer transition dark:hover:brightness-125 hover:brightness-90'>
      {children}
    </span>
  )
}
