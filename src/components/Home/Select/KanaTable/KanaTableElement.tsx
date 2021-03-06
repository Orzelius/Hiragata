import * as React from 'react';

interface Props {
  latin: string;
  kana: string;
  isSelected: boolean;
  isBorder: boolean;
  isHovered: boolean;
  x: number;
  y: number;
  horizontal: boolean;
  // hoverIn: () => void;
  // hoverOut: () => void;
  // click: () => void;
  // showKanaOnHover: boolean;
}

const KanaTableElement: React.FC<Props> = (props: Props) => {
  let customStyle = props.horizontal ? 'w-20 h-12 ' : 'w-12 sm:w-16 h-12 ';
  let text = props.latin;

  if (props.isHovered && props.x !== 0 && props.y !== 0) {
    text = props.kana;
  }

  // if (props.x === 0) {
  //   customStyle += 'mr-4 ';
  // }
  // if (props.y === 0) {
  //   customStyle += 'mb-5 ';
  // }

  if (props.isSelected && !props.isHovered) {
    customStyle += props.isBorder ? ' bg-green-400 border-green-600 ' : 'bg-green-300 border-green-500 ';
  }

  let hoverStyle = props.isBorder ? ' bg-blue-200 border-blue-400 ' : 'bg-blue-100 border-blue-300 ';

  if (props.isSelected) {
    hoverStyle = props.isBorder ? ' bg-green-300 border-green-500 ' : 'bg-green-200 border-green-500 ';
  }

  return (
    <div
      className={'cursor-pointer border-gray-500 border-2 inline-block ' + customStyle + (props.isHovered ? hoverStyle : ' ')}
      // onMouseEnter={() => { props.hoverIn(); }}
      // onKeyPress={() => { props.click(); }}
      // onMouseLeave={() => { props.hoverOut(); }}
      // onClick={() => { props.click(); }}
    >
      <h5 className={'subpixel-antialiased text-center text-xl text-blue-900 mt-1 ' + (props.isBorder ? 'font-semibold ' : 'font-medium ')}>
        {text}
      </h5>
    </div>
  );
};

// export default React.memo(KanaTableElement);
export default KanaTableElement;
