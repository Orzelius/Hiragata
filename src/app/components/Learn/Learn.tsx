import * as React from 'react';
import { appSettings, defaultSettings } from '../../models';
import { RouteComponentProps } from 'react-router';
import { useState } from 'react';
import { Container } from '../BasicComponents';

interface Props extends RouteComponentProps { }

const Learn: React.FC<Props> = (props) => {
  console.log(props.location.state);
  const [settings, setSettings] = useState(defaultSettings);
  if (!props.location.state) {
    setSettings(props.location.state);
  }


  return (
    <Container className="mt-56">
      <sub>{JSON.stringify(settings)}</sub>
    </Container>
  )
}

export default Learn;