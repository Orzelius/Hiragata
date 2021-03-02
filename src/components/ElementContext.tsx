import { createContext, Dispatch, SetStateAction } from 'react';
import { KanaElement } from './Home/KanaTable/KanaTable';

export interface GState {
  learningHiragana: boolean;
  selectedElements: KanaElement[];
  history: {
    elementHistory: {
      element: KanaElement,
      guesses: {
        correct: boolean,
        time: number,
      }[],
      urgency: number,
    }[],
    total: number
  }
}
interface InitConext {
  setGState: Dispatch<SetStateAction<GState>>;
  gState: GState;
}
export const initConext: InitConext = {
  setGState: () => undefined,
  gState: {
    selectedElements: [],
    learningHiragana: true,
    history: {
      elementHistory: [],
      total: 0,
    },
  },
};
export const ElementContext = createContext<InitConext>(initConext);