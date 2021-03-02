import * as React from 'react';

export const colors = {
  Green: 'bg-green-100 border border-green-600 text-green-700 hover:bg-green-200',
  Red: 'bg-red-100 border border-red-600 text-red-700 hover:bg-red-200',
  Gray: 'bg-gray-100 border border-gray-700 hover:bg-gray-300 text-black',
};

interface ButtonProps {
  onClick: () => void;
  color?: string;
  children: React.ReactNode;
  className?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children, onClick, color = 'bg-white border border-gray-700 hover:bg-gray-300 text-black', className = '', props,
}: ButtonProps) => (
  <button {...props} type="button" className={'py-2 px-4 ' + color + ' ' + className} onClick={onClick}>
    {children}
  </button>
);

interface TitleProps {
  children: React.ReactNode;
  question?: React.ReactNode;
}
export const Title: React.FC<TitleProps> = ({ children, question }) => (
  <div className="w-full px-4 sm:px-32">
    <h1 className="text-4xl mt-10 text-center font-semibold leading-none md:leading-normal">
      {children}
      {question}
    </h1>
  </div>
);

// interface QuestionProps {
//   Title: string,
//   text: React.ReactNode
// }
// export const Question: React.FC<QuestionProps> = ({Title, text}) => {
//   let modalVisible = false;
//   onclick = () => {
//     modalVisible = !modalVisible;
//   }
//   return (
//     <div className="bg-gray-400 mx-2 px-3 rounded-lg inline-block hover:bg-gray-600 cursor-default">
//       <h1 className="text-2xl font-semibold text-white">?</h1>
//     </div>
//   )
// }

interface ContaierProps {
  children: React.ReactNode;
  className?: string;
}
export const Container: React.FC<ContaierProps> = ({ children, className }) => (
  <div className={'container p-2 mt-10 xl:px-20 pb-8 ' + className}>
    {children}
  </div>
);