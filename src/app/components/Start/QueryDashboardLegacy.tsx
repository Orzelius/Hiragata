// import * as React from 'react';
// import { Button, colors, Container, Title } from '../BasicComponents';
// import AnswerBox from './AnswerBox';
// import { appSettings } from '../../models';
// import CheckBox from './CheckBox';

// interface State {
//   settings: appSettings;
//   quetion: number;
//   proceed: boolean
// }

// const QueryDashboard: React.FC = () => {
//   const initState: State = {
//     quetion: 0,
//     settings: {
//       input: {
//         hiragana: true,
//         katakana: true,
//         romanji: true
//       },
//       mixAndMatch: true,
//       practice: {

//         hiragana: true,
//         katakana: true
//       },
//       transform: false,
//       vocabulary: {
//         hiragana: true,
//         kanji: true,
//         katakana: true
//       }
//     },
//     proceed: false,
//   }

//   const [state, setState] = React.useState(initState);

//   let question = {
//     title: "",
//     answers: <div></div>
//   }

//   const answer = (answer: string) => {
//     let newState = { ...state };

//     switch (state.quetion) {
//       case (0):
//         if (answer === "both") {
//           newState.settings.practice.hiragana = true;
//           newState.settings.practice.katakana = true;
//         } else {
//           newState.settings.practice.hiragana = (answer === "hiragana");
//           newState.settings.practice.katakana = (answer === "katakana");
//         }
//         newState.quetion++;
//         break;
//       case (1):
//         newState.settings.input.hiragana = (answer === "hiragana");
//         newState.settings.input.katakana = (answer === "katakana");
//         newState.settings.input.romanji = (answer === "romanji");
//         if(newState.settings.input.romanji || newState.settings.input.katakana || newState.settings.input.katakana){
//           newState.proceed = true;
//         }
//         else{
//           newState.proceed = false;
//         }
//         break;
//     }

//     setState(newState);
//     console.log(newState);
//   }

//   switch (state.quetion) {
//     case (0):
//       question.title = "What do you want to practice?";
//       question.answers = (
//         <div className="justify-center mt-8 sm:flex">
//           <AnswerBox  text="hiragana" title="ひ"></AnswerBox>
//           <AnswerBox  text="katakana" title="カ"></AnswerBox>
//           <AnswerBox  text="both" title="ひか"></AnswerBox>
//         </div>
//       )
//       break;
//     case (1):
//       question.title = "Select, what kind on inputs to allow";
//       question.answers = (
//         <div>

//           <div className="justify-center mt-8 sm:flex">
//             <CheckBox  text="hiragana" title="ひ"></CheckBox>
//             <CheckBox  text="katakana" title="カ"></CheckBox>
//             <CheckBox  text="romanji" title="Ro"></CheckBox>
//           </div>
//           <div className="justify-center mt-4 flex">
//             <button className={"px-10 py-1 rounded-lg border-2 text-lg " + (state.proceed ? "border-green-500 text-green-500 hover:border-green-700 hover:text-green-700" : "text-gray-600 cursor-default")}>
//               Ok
//             </button>
//           </div>
//         </div>
//       )
//       break;
//   }
//   return (
//     <Container>
//       <div className="mt-20">
//         <Title>{question.title}</Title>
//       </div>
//       {question.answers}
//       <h2 className="text-gray-500 text-sm mt-20 text-center">You can change the settings later as well</h2>
//       <div className="justify-center mt-3 flex">
//         <button className="border-gray-500 border-2 rounded text-gray-600 hover:text-gray-700 hover:border-gray-700 px-8 py-1">Skip Setup</button>
//       </div>
//     </Container>
//   );
// }

// export default QueryDashboard;