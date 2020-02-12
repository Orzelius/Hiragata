import React from 'react';
import AnswerBox from "../AnswerBox"
import CheckBox from '../CheckBox';

export interface question {
  choices: {
    icon: string,
    text: string
  }[],
  columns: number,
  question: string,
  multipleAnswer: boolean
}

export const Questions: question[] = 
[
  {
    question: "What do you want to practice?",
    choices:  [
      {text:"hiragana", icon:"ひ"},
      {text:"katakana", icon:"カ"},
      {text:"both", icon:"ひか"}
    ],
    columns: 1,
    multipleAnswer: false,
  },
  {
    question: "Select, what kind on inputs to allow",
    choices:  [
      {text:"hiragana", icon:"ひ"},
      {text:"katakana", icon:"カ"},
      {text:"romanji", icon:"Ro"}
    ],
    columns: 1,
    multipleAnswer: true,
  },
  {
    question: "Which vocabulary to use?",
    choices:  [
      {text:"hiragana only words", icon:"ひ"},
      {text:"katakana only words", icon:"カ"},
      {text:"kanji", icon:"漢字"}
    ],
    columns: 1,
    multipleAnswer: true,
  }
]