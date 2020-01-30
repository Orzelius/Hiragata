export interface settings{
  appSettings: appSettings
}

export interface appSettings{
  input: {
    hiragana: boolean
    katakana: boolean
    romanji: boolean
  }
  practice: {
    katakana: boolean
    hiragana: boolean
  }
  mixAndMatch: boolean
  vocabulary: {
    kanji: boolean
    hiragana: boolean
    katakana: boolean
  }
  transform: boolean
}