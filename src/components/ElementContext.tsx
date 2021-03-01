import { createContext, Dispatch, SetStateAction } from 'react';
import { KanaElement } from './Home/KanaTable/KanaTable';

export interface GState {
  learningHiragana: boolean;
  elements: KanaElement[];
}
interface InitConext {
  setGState: Dispatch<SetStateAction<GState>>;
  gState: GState;
}
const initConext: InitConext = {
  setGState: () => undefined,
  gState: {
    elements: [],
    learningHiragana: true
  }
}
export const ElementContext = createContext<InitConext>(initConext);