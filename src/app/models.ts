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

export const defaultSettings: appSettings = {
  input: {
    hiragana: true,
    katakana: true,
    romanji: true
  },
  mixAndMatch: true,
  practice: {
    hiragana: true,
    katakana: true
  },
  transform: false,
  vocabulary: {
    hiragana: true,
    kanji: true,
    katakana: true
  }
}