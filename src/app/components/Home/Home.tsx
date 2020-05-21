import * as React from 'react';
import { Container, Title } from '../../Helpers/BasicComponents';
import KanaSelector from './KanaTable/KanaSelector';

const Home: React.FC = () => (
  <Container className="container sm:p-2 mt-16 lg:px-32 pb-8">
    <div className="flex content-center">
      <Title>
        Choose, which kana to learn!
      </Title>
    </div>
    <div className="mt-3 flex justify-center">
      <KanaSelector />
    </div>
  </Container>
);

export default Home;
