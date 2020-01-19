import * as React from 'react';
import { Button, colors, Container, Title } from '../BasicComponents';
import AnswerBox from './AnswerBox';
import Example from './example';

const QueryDashboard: React.FC = () => {
  return (
    <Container>
      <Example></Example>
      {/* <div className="flex justify-center mt-20">
        <Title>A quick setup before you start</Title>
      </div>
      <div className="flex justify-center mt-8">
        <AnswerBox onClick={() => {}} text="" title=""></AnswerBox>
        <AnswerBox onClick={() => {}} text="" title=""></AnswerBox>
        <AnswerBox onClick={() => {}} text="" title=""></AnswerBox>
      </div> */}
    </Container>
  );
}

export default QueryDashboard;