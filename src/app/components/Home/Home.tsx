import * as React from 'react';
import { useState } from 'react';
import * as wanakana from 'wanakana';
import { Title, Container } from '../../Helpers/BasicComponents';
import KanaTable from './KanaTables/HiraganaTable';

const Home: React.FC = () => {

  return (
    <Container className="container p-2 mt-20 md:mt-10 lg:px-32 pb-8">
      <div className="flex content-center">
        <Title>
          A tool for learning hiragana and katakana, with real life words
        </Title>
      </div>
      <KanaTable></KanaTable>
    </Container>
  );
}

export default Home;