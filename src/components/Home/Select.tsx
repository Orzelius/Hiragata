import * as React from 'react';
import { Title } from '../../Helpers/BasicComponents';
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
    <h4 className="StrokeOrderFont text-white" style={{ fontSize: '00.1rem' }}>ア</h4>
  </>
);

export default Select;
