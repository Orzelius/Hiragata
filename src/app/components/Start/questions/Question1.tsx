import * as React from 'react';
import CheckBox from '../CheckBox';
import AnswerBox from '../AnswerBox';
import { Title } from '../../BasicComponents';

interface questionProps {
  submit(answer: number): void,
  choices: JSX.Element,
  columns: number,
  question: string;
}

export const Question: React.FC<questionProps> = ({ submit, choices, columns, question }) => {
  return (
    <div>
      <div>
        <Title>{question}</Title>
      </div>
      {choices}
    </div >
  )
}