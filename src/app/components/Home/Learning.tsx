import * as React from 'react';
import { Container, Title } from '../../Helpers/BasicComponents';
import KanaSelector, { Element } from './KanaTable/KanaSelector';

const startingSelection: Element[] = [];
const stages = ['Select', 'Start', 'Learn', 'Practice'];
const Learning: React.FC = () => {
  const [selection, setSelection] = React.useState(startingSelection);
  const [stage, setStage] = React.useState(stages[0]);
  const start = (selectedElements: Element[]) => {
    setSelection(selectedElements);
    setStage(stages[1]);
  };

  if (stage === stages[0]) {
    return (
      <Container className="container sm:p-2 mt-16 lg:px-32 pb-8">
        <div className="flex content-center">
          <Title>
            Choose, which kana to learn!
          </Title>
        </div>
        <div className="mt-3 flex justify-center">
          <KanaSelector start={start} />
        </div>
      </Container>
    );
  }
  return (
    <div />
  );
};

export default Learning;
