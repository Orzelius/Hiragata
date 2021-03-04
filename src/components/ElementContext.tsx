import { createContext, Dispatch, SetStateAction } from 'react';
import { KanaElement } from './Home/KanaTable/KanaTable';

export interface Guess {
  correct: boolean,
  time: number,
}

export interface Progress {
  elements: {
    fresh: boolean
    element: KanaElement,
    guesses: Guess[],
    urgency: number,
  }[],
  total: number
}

export interface GState {
  learningHiragana: boolean;
  selectedElements: KanaElement[];
  progress: Progress;
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
    progress: {
      elements: [],
      total: 0,
    },
  },
};
export const ElementContext = createContext<InitConext>(initConext);