import * as React from 'react';
import { Title } from '../../../Helpers/BasicComponents';
import KanaSelector from './KanaTable/KanaSelector';

const Select: React.FC = () => (
  <>
    <div className="flex content-center">
      <Title>
        Choose, which kana to learn!
      </Title>
    </div>
    <div className="mt-3 flex justify-center">
      <KanaSelector />
    </div>
  </>
);

export default Select;
