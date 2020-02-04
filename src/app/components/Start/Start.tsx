import * as React from 'react';
import { Button, colors, Container, Title } from '../BasicComponents';
import AnswerBox from './AnswerBox';
import { appSettings, defaultSettings } from '../../models';
import CheckBox from './CheckBox';
import { Question } from './questions/Question';
import { question, Questions } from './questions/Questions';
import { useHistory } from 'react-router';
import { render } from 'react-dom';
import Learn from '../Learn/Learn';

interface SetupState {
  questionNo: number,
  question: question
}

const Start: React.FC = () => {
  const initSetupState: SetupState = {
    questionNo: 0,
    question: Questions[0]
  }

  const [settings, setSettings] = React.useState(defaultSettings);
  const [setupState, SetSetupState] = React.useState(initSetupState);
  const history = useHistory();

  const submit = (answers: boolean[]) => {
    let newSettings = { ...settings };
    let newSetup = { ...setupState };

    switch (newSetup.questionNo) {
      case (0):
        newSettings.practice.hiragana = answers[0] || answers[2]
        newSettings.practice.katakana = answers[1] || answers[2]
          break;
      case (1):
        newSettings.input.hiragana = answers[0]
        newSettings.input.katakana = answers[1]
        newSettings.input.romanji = answers[2]
        break;
      case (2):
        newSettings.vocabulary.hiragana = answers[0]
        newSettings.vocabulary.katakana = answers[1]
        newSettings.vocabulary.kanji = answers[2]
        break;

    }

    newSetup.questionNo = setupState.questionNo + 1;
    newSetup.question = Questions[newSetup.questionNo];
    setSettings(newSettings);
    console.log(newSettings);
    if (setupState.questionNo === Questions.length - 1) {
      history.push("/Learn", {...newSettings})
    }
    SetSetupState(newSetup);
  }


  return (
    <Container>
      <Question
        key={setupState.questionNo}
        initState={setupState.question.choices.map(choice => false)}
        choices={setupState.question.choices}
        question={setupState.question.question}
        submit={submit}
        multipleAnswer={setupState.question.multipleAnswer}
        columns={setupState.question.columns}>
      </Question>
      <h2 className="text-gray-500 text-sm mt-20 text-center">You can change the settings later as well</h2>
      <div className="justify-center mt-3 flex">
        <button className="border-gray-500 border-2 rounded text-gray-600 hover:text-gray-700 hover:border-gray-700 px-8 py-1">Skip Setup</button>
      </div>
    </Container>
  );
}

export default Start;