import * as React from 'react';

interface checkProps {
  title: string
  text: string
  onClick(): void
}

const CheckBox: React.FC<checkProps> = ({ title, text, onClick }) => {
  const [checked, setState] = React.useState(false)

  const onLocalClick = () => {
    setState(!checked);
  }

  if(!checked){
    return (
      <div onClick={() => {onLocalClick(); onClick()}}
        className="border-gray-600 border-4 rounded-lg p-1 mt-4 hover:bg-gray-100 cursor-pointer sm:w-48 sm:h-48 sm:mx-2">
        <div className="inline-block w-32 sm:block sm:w-auto">
          <h1 className="text-center text-gray-900 text-4xl px-4 sm:text-center sm:p-1 sm:m-1 sm:font-bold sm:text-6xl sm:text-gray-700">{title}</h1>
        </div>
        <div style={{top: "-5px"}} className=" relative inline-block content-center pb-2 sm:block sm:mt-2">
          <h1 className={(text.length > 10 ? "text-xl" : "text-2xl" )+ " text-gray-800 sm:text-center ml-2 sm:ml-0"}>{text}</h1>
        </div>
      </div>
    )
  }
  if(checked){
    return (
      <div onClick={() => {onLocalClick(); onClick()}}
        className="border-blue-500 border-4 rounded-lg p-1 mt-4 hover:bg-blue-100 bg-blue-100 cursor-pointer sm:w-48 sm:h-48 sm:mx-2">
        <div className="inline-block w-32 sm:block sm:w-auto">
          <h1 className="text-center text-blue-700 text-4xl px-4 sm:text-center sm:p-1 sm:m-1 sm:font-bold sm:text-6xl sm:text-blue-700">{title}</h1>
        </div>
        <div style={{top: "-5px"}} className=" relative inline-block content-center pb-2 sm:block sm:mt-2">
          <h1 className={(text.length > 10 ? "text-xl" : "text-2xl" )+ " text-gray-800 sm:text-center ml-2 sm:ml-0"}>{text}</h1>
        </div>
      </div>
    )
  }
  return (null);
}

export default CheckBox;