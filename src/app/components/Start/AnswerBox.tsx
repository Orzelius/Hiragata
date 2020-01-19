import * as React from 'react';

interface answerProps {
  title: string
  text: string
  onClick(): void
}

const AnswerBox:React.FC<answerProps> = ({title, text, onClick}) => {
  return(
    <div className="w-48 h-48 border-gray-300 rounded-xl border-4 m-2">
    </div>
  )
}

export default AnswerBox;