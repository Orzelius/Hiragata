/* eslint-disable react/button-has-type */
import * as React from 'react';
import CanvasFreeDrawing from 'canvas-free-drawing';

interface Props {
  character: string;
}
let cfd: CanvasFreeDrawing = null;
const canvasProps = {
  h: 500,
  w: 500,
  lineWidth: 25,
  drawColor: [5, 5, 5],
};
const DrawBoard: React.FC<Props> = ({ character }) => {
  const drawBorder = () => {
    const c = document.getElementById('cfd') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    const { h, w } = canvasProps;
    // padding
    const p = 70;
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

  React.useEffect(() => {
    cfd = new CanvasFreeDrawing({
      elementId: 'cfd',
      width: canvasProps.w,
      height: canvasProps.h,
    });

    // set properties
    cfd.setLineWidth(20); // in px
    cfd.setStrokeColor(canvasProps.drawColor); // in RGB
    drawBorder();
    cfd.setStrokeColor(canvasProps.drawColor); // in RGB
  });

  const clear = () => {
    cfd.clear();
    drawBorder();
  };

  return (
    <div className="">
      <canvas className="border-gray-600 border rounded" id="cfd" />
      <div className="mt-1">
        {/* <button onClick={clear} type="button" className="border-gray-500 border hover:bg-red-200 rounded py-1 px-4 mr-2">Clear</button> */}
        <button onClick={clear} type="button" className="inline-block float-right border-gray-500 border hover:bg-gray-200 rounded py-1 px-4 mr-2">Clear</button>
      </div>
    </div>
  );
};

export default React.memo(DrawBoard);