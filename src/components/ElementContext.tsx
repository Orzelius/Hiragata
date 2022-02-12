import { createContext, Dispatch, SetStateAction } from 'react';
import { KanaElement } from './Home/Select/KanaTable/KanaTable';

export interface Guess {
  correct: boolean,
  time: number,
}

export type ElementStatus =
'notLearnt' |// Has not been learned yet
'fresh' |// Has just been learned but not yet reviewed/practiced
'urgent' |// Urgency is beyond max acceptable
'green'; // Urgency is below max acceptable

export interface GElement {
  status: ElementStatus;
  element: KanaElement;
  guesses: Guess[],
  urgency: number;
}

export interface Progress {
  elements: GElement[],
  total: number
}

export interface GState {
  learningHiragana: boolean;
  selectedElements: KanaElement[];
  progress: Progress;
  ai: boolean;
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
    ai: false,
  },
};
export const ElementContext = createContext<InitConext>(initConext);