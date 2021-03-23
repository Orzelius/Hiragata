import * as React from 'react';
import { Title } from '../../../Helpers/BasicComponents';
import { ElementContext } from '../../ElementContext';
import KanaSelector from './KanaTable/KanaSelector';

const Select: React.FC = () => {
  const [cleared, setCleared] = React.useState(false);
  const { gState, setGState } = React.useContext(ElementContext);
  React.useEffect(() => {
    if (!cleared) {
      setGState({ ...gState, selectedElements: [] });
      setCleared(true);
    }
  }, [cleared, gState, setGState]);
  return (
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
};

export default Select;
