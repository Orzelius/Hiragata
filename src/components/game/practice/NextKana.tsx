import * as React from 'react';
import { KanaElement } from '../../Home/KanaTable/KanaTable';

interface NextKanaProps {
  kana: KanaElement;
}

const NextKana:React.FC<NextKanaProps> = ({ kana }) => (<h1>{kana.latin}</h1>);

export default NextKana;