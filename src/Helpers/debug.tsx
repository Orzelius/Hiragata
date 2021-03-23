import * as React from 'react';
import {
  BarChart,
  XAxis,
  Bar,
  YAxis,
} from 'recharts';
import { ElementContext } from '../components/ElementContext';
import Evaluator from '../components/game/logic/Evaluator';

interface Props {
  evaluator: Evaluator
}
const EvaluatorDebug: React.FC<Props> = ({ evaluator }) => {
  const { gState } = React.useContext(ElementContext);

  const data = gState.progress.elements.map(el => ({
    character: el.element.latin,
    urgencyR: el.urgency >= evaluator.urgencyHigherLimit ? el.urgency : 0,
    urgencyG: el.urgency < evaluator.urgencyHigherLimit ? el.urgency : 0,
  }));

  return (
    <div className="overflow-x-scroll">
      <BarChart
        width={data.length * 30}
        height={100}
        data={data}
        className="mt-8"
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="character" />
        <YAxis allowDecimals={false} domain={[1, evaluator.maxUrgency]} hide />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar dataKey="urgencyR" stackId="a" fill="#ff695c" />
        <Bar dataKey="urgencyG" stackId="a" fill="#90ed7b" />
      </BarChart>
    </div>
  );
};

export default EvaluatorDebug;
