import * as React from 'react';
import { useLocation, useHistory } from 'react-router';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line,
} from 'recharts';
import { HistoryElement } from '../practice/Practice';
import { Container, Title } from '../../../Helpers/BasicComponents';
import { ElementContext } from '../../ElementContext';
import { KanaElement } from '../../Home/KanaTable/KanaTable';

const Results: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  const [state, setState] = React.useState({ showFailures: true });

  if (!location.state) {
    history.push('/');
  } else {
    const historyArray = location.state as HistoryElement[];
    if (historyArray.length === 0) {
      return (
        <Container className="container sm:p-2 mt-16 lg:px-32 pb-8">
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
        </Container>
      );
    }

    const globalState = React.useContext(ElementContext).state;
    const data: { character: string; total: number; correct: number; incorrect: number }[] = globalState.elements.map(el => (
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
      <div>
        <Container className="container sm:p-2 mt-16 lg:px-32 pb-8">
          <div className="content-center text-center">
            <Title>
              Here are your practice results
            </Title>
          </div>
        </Container>
        <BarChart
          width={globalState.elements.length * 70}
          height={300}
          data={data}
          className="mx-auto mt-4"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="character" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="incorrect" stackId="a" fill="#ff695c" />
          <Bar dataKey="correct" stackId="a" fill="#90ed7b" />
        </BarChart>
      </div>
    );
  }
  return (
    <div />
  );
};

export default Results;