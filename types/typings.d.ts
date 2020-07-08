/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.png';
declare module '*.jpg';
declare module '*.json';
declare module '*.svg';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}
declare module 'json!*' {
  const json: any;
  export default json;
}