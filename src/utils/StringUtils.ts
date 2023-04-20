export function random(length = 8) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

export function getTitleFormat(text: string) {
  if (text.length === 1) {
    return text.toUpperCase();
  }
  let lowercase = text.toLowerCase();
  let firstLetter = lowercase[0].toUpperCase();
  return firstLetter + lowercase.substring(1);
}

export function capitalizeEveryWord(text: string) {
  let splitText = text.toLowerCase().split(' ');
  for (let i = 0; i < splitText.length; i++) {
    splitText[i] = splitText[i].charAt(0).toUpperCase() + splitText[i].substring(1);
  }
  // Directly return the joined string
  return splitText.join(' ');
}

export function containsNumber(text: string) {
  return /\d/.test(text);
}
