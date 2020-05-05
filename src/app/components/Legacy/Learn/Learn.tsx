import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container } from '../../../Helpers/BasicComponents';
import { defaultSettings } from '../../../models';
import InputArea from './InputArea';


type Props = RouteComponentProps

const Learn: React.FC<Props> = (props) => {
  console.log(props.location.state);
  const [settings, setSettings] = React.useState(defaultSettings);
  if (!props.location.state) {
    setSettings(props.location.state);
  }


  return (
    <Container className="mt-56">

      {/* Input Area */}
      <div className="flex justify-center">
        <InputArea settings={settings} />
      </div>
    </Container>
  );
};

export default Learn;