import * as React from 'react';
import { useLocation, useHistory } from 'react-router';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar,
} from 'recharts';
import { HistoryElement } from '../practice/Practice';
import { Title } from '../../../Helpers/BasicComponents';
import { ElementContext } from '../../ElementContext';

const Results: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  // const [state, setState] = React.useState({ showFailures: true });
  const globalState = React.useContext(ElementContext).gState;

  if (!location.state || !globalState.selectedElements) {
    history.push('/');
  } else {
    const historyArray = location.state as HistoryElement[];
    if (historyArray.length === 0) {
      return (
        <div className="content-center text-center">
          <Title>
            Looks like you did not practice :D
            </Title>
          <button
            // onClick={roundState.status === 1 ? nextKana : checkAnswer}
            onClick={() => { history.push('/'); }}
            type="submit"
            className="py-1 mt-4 px-4 text-xl border border-gray-500 rounded w-40 hover:bg-blue-200 hover:border-blue-900"
          >
            Back home
            </button>
        </div>
      );
    }

    const data: { character: string; total: number; correct: number; incorrect: number }[] = globalState.selectedElements.map(el => (
      {
        character: (globalState.learningHiragana ? el.hiragana : el.katakana) + ' ' + el.latin,
        total: 0,
        correct: 0,
        incorrect: 0,
      }
    ));
    historyArray.forEach(el => {
      if (el.correct) data[el.number].correct++;
      else data[el.number].incorrect++;
      data[el.number].total++;
    });

    return (
      <div className="container mt-24">
        <Title>
          Here are your practice results
        </Title>
        <h4 className="text-2xl inline-block">
          Total practices:
          <span className="text-3xl ml-4 text-gray-600 font-light inline-block mr-2">
            {historyArray.length}
          </span>
        </h4>
        <BarChart
          width={globalState.selectedElements.length * 70 < 500 ? 500 : globalState.selectedElements.length * 70}
          height={300}
          data={data}
          className="mt-8"
          margin={{
            top: 0, right: 0, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="character" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="incorrect" stackId="a" fill="#ff695c" />
          <Bar dataKey="correct" stackId="a" fill="#90ed7b" />
        </BarChart>

        <button
          // onClick={roundState.status === 1 ? nextKana : checkAnswer}
          onClick={() => { history.push('/'); }}
          type="submit"
          className="py-1 mt-8 px-4 text-xl border border-gray-500 rounded w-56 hover:bg-blue-200 hover:border-blue-900 inline-block"
        >
          Go back home
        </button>
        <span className=" ml-2 text-xl">
          Or say thanks to
          <a href="https://www.tofugu.com/" target="_blank" rel="noreferrer" className="mx-2 underline text-blue-500 hover:text-blue-600">Tofugu</a>
          who kindheartedly let me use their mnemonics in this app
        </span>
      </div>
    );
  }
  return (
    <div />
  );
};

export default Results;