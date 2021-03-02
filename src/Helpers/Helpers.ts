export const vowels = ['a', 'i', 'u', 'e', 'o'];
export const consonants = ['k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];

export const findUnsafe = <T>(arr: T[], find: (e: T, i?: number) => boolean): T => (arr.find(find) as never as T);