import * as React from 'react';

interface Props {
  latin: string;
  kana: string;
  isSelected: boolean;
  isBorder: boolean;
  isHovered: boolean;
  x: number;
  y: number;
  hoverIn: () => void;
  hoverOut: () => void;
  click: () => void;
}

const KanaElement: React.FC<Props> = (props: Props) => {
  let customStyle = '';
  let text = props.latin;

  if (props.isHovered && props.x !== 0 && props.y !== 0) {
    text = props.kana;
  }


  if (props.x === 0) {
    customStyle += 'mr-3 ';
  }
  if (props.y === 0) {
    customStyle += 'mb-4 ';
  }

  if (props.isSelected && !props.isHovered) {
    customStyle += props.isBorder ? ' bg-green-400 border-green-600 ' : 'bg-green-300 border-green-500 ';
  }

  let hoverStyle = props.isBorder ? ' bg-blue-200 border-blue-400 ' : 'bg-blue-100 border-blue-300 ';

  if (props.isSelected) {
    hoverStyle = props.isBorder ? ' bg-green-300 border-green-500 ' : 'bg-green-200 border-green-500 ';
  }

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className={'w-10 sm:w-16 cursor-pointer border-gray-500 border-2 h-12 m-1 inline-block ' + customStyle + (props.isHovered ? hoverStyle : ' ')}
      onMouseEnter={() => { props.hoverIn(); }}
      onKeyPress={() => { props.click(); }}
      onMouseLeave={() => { props.hoverOut(); }}
      onClick={() => { props.click(); }}
    >
      <h5 className={'subpixel-antialiased mt-1 text-center text-xl text-blue-900 ' + (props.isBorder ? 'font-semibold ' : 'font-medium')}>
        {text}
      </h5>
    </div>
  );
};

export default KanaElement;
