import * as React from 'react';
import { Container, Title } from '../../Helpers/BasicComponents';
import KanaSelector from './KanaTable/KanaSelector';

const Home: React.FC = () => (
  <Container className="container p-2 mt-20 md:mt-10 lg:px-32 pb-8">
    <div className="flex content-center">
      <Title>
          Choose, which kana to learn!
      </Title>
    </div>
    <div className="mt-6 sm:flex justify-center">
      <KanaSelector />
    </div>
  </Container>
);

export default Home;
