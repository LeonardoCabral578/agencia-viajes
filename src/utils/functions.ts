export function shortenText(text: string, length: number) {
  return text.length < length ? text : text.slice(0, length) + "...";
}

export function generateRandomKey() {
  return `${Math.random().toString(36).substr(2, 9)}`; // Genera una cadena de 9 caracteres alfanuméricos
}

export function stringToDate(dateString: string) {
  return new Date(dateString);
}
