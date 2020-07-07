import { createContext, Dispatch, SetStateAction } from 'react';
import { KanaElement } from './Home/KanaTable/KanaTable';

export interface State {
  learningHiragana: boolean;
  elements: KanaElement[];
}
interface InitConext {
  setState: Dispatch<SetStateAction<State>>;
  state: State;
}
const initConext: InitConext = null;
export const ElementContext = createContext(initConext);