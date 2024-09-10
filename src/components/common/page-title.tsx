import React from 'react'

const PageTitle = ({
    title
}:{
    title: string
}) => {
  return <h1 className="font-extrabold text-4xl">{title}</h1>
}

export default PageTitle