/* eslint-disable react/button-has-type */
import * as React from 'react';
import CanvasFreeDrawing, { AllowedEvents } from 'canvas-free-drawing';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

interface Props {
  character: string;
  onCharacterShow: (isShowed: boolean) => void;
  showCharacter: boolean;
  onDrawn: () => void;
  size: number;
}
let cfd: CanvasFreeDrawing;

const DrawBoard: React.FC<Props> = ({
  character, onCharacterShow, showCharacter, onDrawn: onDraw, size,
}) => {
  const canvasProps = {
    h: size,
    w: size,
    lineWidth: size / 20,
    drawColor: [5, 5, 5],
  };
  const [state, setState] = React.useState({ canvasIsDrawn: false, cfd });
  const [userHasDrawn, setUserHasDrawn] = React.useState(false);
  const drawBorder = () => {
    const c = document.getElementById('cfd') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const { h, w } = canvasProps;
    // padding
    // const p = 70;
    ctx.strokeStyle = '#e8e8e8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    // ctx.lineTo(w - p, h - p);
    // ctx.lineTo(w - p, p);
    // ctx.lineTo(p, p);
    ctx.stroke();
    ctx.lineWidth = canvasProps.lineWidth;
  };

  const showKana = () => {
    const c = document.getElementById('cfd') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'gray';
    ctx.font = size + 'px KanjiStrokeOrders';
    ctx.fillText(character, 0, size / 1.25);
  };

  React.useEffect(() => {
    if (!state.canvasIsDrawn || size !== state.cfd.width) {
      cfd = new CanvasFreeDrawing({
        elementId: 'cfd',
        width: canvasProps.w,
        height: canvasProps.h,
      });

      cfd.clear();
      cfd.setLineWidth(canvasProps.lineWidth); // in px
      cfd.setStrokeColor(canvasProps.drawColor); // in RGB
      cfd.on({ event: AllowedEvents.mousedown }, () => {
        setUserHasDrawn(true);
        onDraw();
      });
      drawBorder();
      cfd.setStrokeColor(canvasProps.drawColor); // in RGB
      if (showCharacter) showKana();
      setState({ canvasIsDrawn: true, cfd });
    }
    if (state.canvasIsDrawn && showCharacter && !userHasDrawn) {
      // state.cfd.clear();
      state.cfd.setLineWidth(canvasProps.lineWidth); // in px
      state.cfd.setStrokeColor(canvasProps.drawColor); // in RGB
      drawBorder();
      state.cfd.setStrokeColor(canvasProps.drawColor); // in RGB
      if (showCharacter) showKana();
    }
  });

  // else if (state.drawn && !showCharacter) state.cfd.clear();

  const clearButtonClicked = () => {
    setUserHasDrawn(false);
    cfd.clear();
    drawBorder();
    if (showCharacter) showKana();
  };

  const showKanaClick = () => {
    state.cfd.clear();
    drawBorder();
    setUserHasDrawn(false);
    onCharacterShow(!showCharacter);
  };

  return (
    <div style={{ width: canvasProps.w }}>
      <canvas
        className="border-gray-600 border rounded"
        id="cfd"
        style={{ width: canvasProps.w, height: canvasProps.h, touchAction: "none" }}
        // onTouchStart={() => disableBodyScroll(document.getElementById('asd'))}
        onTouchEnd={() => clearAllBodyScrollLocks()}
      />
      <div className="mt-1">
        <button onClick={clearButtonClicked} type="button" className="border-gray-500 border hover:bg-red-200 rounded py-1 px-4 mr-2">Clear</button>
        <button
          onClick={showKanaClick}
          type="button"
          className="inline-block float-right border-gray-500 border hover:bg-gray-200 rounded py-1 px-4 mr-2"
        >
          {showCharacter ? 'Hide Kana' : 'Show Kana'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(DrawBoard);
// export default DrawBoard;