import * as React from 'react';
import CheckBox from '../CheckBox';
import AnswerBox from '../AnswerBox';
import { Title } from '../../BasicComponents';

interface questionProps {
  submit(answer: boolean[]): void,
  choices: {
    icon: string,
    text: string
  }[],
  question: string,
  columns?: number,
  multipleAnswer?: boolean,
  initState: boolean[]
}


export const Question: React.FC<questionProps> = ({ submit, choices, question, multipleAnswer = false, columns = 1, initState }) => {
  const [checks, setChecks] = React.useState(initState);

  const handleChoice = (choiceNo: number) => {
    if (!multipleAnswer) {
      let newChecks = [...checks];
      newChecks[choiceNo] = true;
      submit(newChecks)
    }
    else{
      let newState = [...checks];
      newState[choiceNo] = !newState[choiceNo];
      setChecks(newState);
    }
  }

  const handleSubmit = () => {
    submit(checks);
  }

  let buttonJsx = multipleAnswer ? (
    <div className="justify-center mt-4 flex">
      <button
        onClick={handleSubmit}
        className={"px-10 py-1 rounded-lg border-2 text-lg " + (checks.some(c => c) ? "border-green-500 text-green-500 hover:border-green-700 hover:text-green-700" : "text-gray-600 cursor-default")}>
        Ok
    </button>
    </div>
  ) : null;

  let choiceBoxes: JSX.Element[] = [];
  if (!multipleAnswer) {
    choices.forEach((q, index) => {
      choiceBoxes.push(
        <AnswerBox text={q.text} title={q.icon} onClick={() => { handleChoice(index) }} key={index}></AnswerBox>
      )
    })
  }
  else {
    choices.forEach((q, index) => {
      choiceBoxes.push(
        <CheckBox text={q.text} title={q.icon} onClick={() => { handleChoice(index) }} key={index}></CheckBox>
      )
    })
  }

  return (
    <div>
      <div>
        <Title>{question}</Title>
      </div>
      <div className="justify-center mt-8 sm:flex">
        {choiceBoxes}
      </div>
      {buttonJsx}
    </div >
  )
}