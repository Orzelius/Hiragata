import * as React from 'react';
import { useState } from 'react';

interface props {
  latin: string
  hiragana: string
  katakana: string
  isSelected: boolean
  isBorder: boolean
  x: number
  y: number
  hover: () => void;
  click: () => void;
}

const KanaElement: React.FC<props> = (props) => {
  const [state, setState] = useState({ hover: false });

  let customStyle = "";

  if (props.x === 0) {
    customStyle += "mr-3 ";
  }
  if (props.y === 0) {
    customStyle += "mb-3 ";
  }
  if (props.isSelected) {
    customStyle += "bg-green-400 border-green-600 ";
  }

  let hoverStyle = props.isBorder ? "bg-blue-200 border-blue-400" : "bg-blue-100 border-blue-300";

  return (
      <div className={"border-gray-500 border-2 w-12 h-12 m-1 inline-block " + customStyle + (state.hover ? hoverStyle : " ")}
        onMouseOver={() => { setState({ hover: true }) }}
        onMouseLeave={() => { setState({ hover: false }) }}
        onClick={() => {props.click()}}>
        <h5 className={"text-center text-xl text-blue-900 " + (props.isBorder ? "font-semibold" : "font-medium")}>{props.latin}</h5>
      </div>
  )
}

export default KanaElement;