export interface Mnemonic {
  latin: string;
  kana: string;
  picture: {
    alt: string;
  };
  mnemonic: {
    text: string;
    isCode: boolean;
  }[];
}