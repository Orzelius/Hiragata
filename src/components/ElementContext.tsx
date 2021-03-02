import { createContext, Dispatch, SetStateAction } from 'react';
import { KanaElement } from './Home/KanaTable/KanaTable';

export interface GState {
  learningHiragana: boolean;
  selectedElements: KanaElement[];
  elementHistory: {
    element: KanaElement,
    guesses: {
      correct: boolean,
      time: Date,
    },
    urgency: number,
  }[],
}
interface InitConext {
  setGState: Dispatch<SetStateAction<GState>>;
  gState: GState;
}
const initConext: InitConext = {
  setGState: () => undefined,
  gState: {
    selectedElements: [],
    learningHiragana: true,
    elementHistory: [],
  },
};
export const ElementContext = createContext<InitConext>(initConext);