import * as React from 'react';
import { useState } from 'react';
import * as wanakana from 'wanakana';
import { Title, Container } from '../../Helpers/BasicComponents';
import KanaTable from './KanaTable/KanaTable';

const Home: React.FC = () => {

  return (
    <Container className="container p-2 mt-20 md:mt-10 lg:px-32 pb-8">
      <div className="flex content-center">
        <Title>
          A tool for learning hiragana and katakana, with real life words
        </Title>
      </div>
      <div className="mt-12">
        <KanaTable></KanaTable>
      </div>
    </Container>
  );
}

export default Home;