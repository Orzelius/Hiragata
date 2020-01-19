import * as React from 'react';

export const colors =  {
  Green: "bg-green-100 border border-green-600 text-green-700 hover:bg-green-200",
  Red: "bg-red-100 border border-red-600 text-red-700 hover:bg-red-200",
  Gray: "bg-gray-100 border border-gray-700 hover:bg-gray-300 text-black"
}

interface buttonProps {
  onClick: () => void,
  color?: string,
  children: React.ReactNode,
  className?: string
}

export const Button: React.FC<buttonProps> = ({children ,onClick, color = "bg-white border border-gray-700 hover:bg-gray-300 text-black", className=""}: buttonProps) => {
  return (
    <button className={"py-2 px-4 " + color + " " + className} onClick={onClick}>
      {children}
    </button>
  )
}


interface TitleProps {
  children: React.ReactNode,
}
export const Title: React.FC<TitleProps> = ({children}) => {
  return (
    <div className="w-full">
      <h1 className="text-4xl mt-10 text-center px-4 sm:px-32 font-semibold leading-none md:leading-normal">
        {children}
      </h1>
    </div>
  )
}

interface ContaierProps{
  children: React.ReactNode,
  className?: string
}
export const Container: React.FC<ContaierProps> = ({children, className}) => {
  return (
    <div className={"container p-2 mt-20 md:mt-10 lg:px-32 pb-8 " + className}>
      {children}
    </div>
  )
}