declare module '*.png';
declare module '*.jpg';
declare module '*.json';
declare module '*.svg';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}