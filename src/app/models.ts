export interface Mnemonic {
  latin: string;
  kana: string;
  picture: {
    alt: string;
    src: string;
  };
  mnemonic: {
    text: string;
    isCode: boolean;
  }[];
}