import * as React from 'react';
import { Button, colors, Container, Title, Question } from '../BasicComponents';
import AnswerBox from './AnswerBox';

const QueryDashboard: React.FC = () => {
  return (
    <Container>
      <div className="flex justify-center mt-20">
        <Title>A quick setup before you start</Title>
      </div>
      <div className="justify-center mt-8 sm:flex">
        <AnswerBox onClick={() => { }} text="hiragana" title="か"></AnswerBox>
        <AnswerBox onClick={() => { }} text="katakana" title="カ"></AnswerBox>
        <AnswerBox onClick={() => { }} text="both" title="カか"></AnswerBox>
      </div>
    </Container>
  );
}

export default QueryDashboard;