import { FunctionComponent } from "react";

interface IProps {
  text: string;
}

const wordsToRemove = ["and"];


export const Truncator: FunctionComponent<IProps> = ({ text }) => {
  const full = text;
  const char8 = TruncateTo8Characters(text);
  const char4 = TruncateTo4Characters(text);
  return (
    <div style={{ display: "flex", fontFamily: "monospace" }}>
      <div
        style={{
          color: ContainsPunctuation(full) ? "red" : undefined,
          padding: 8,
          flex: 1,
          borderTop: "1px solid grey",
          borderLeft: "1px solid grey",
        }}
      >
        {full}
      </div>
      <div
        style={{
          color: ContainsPunctuation(char8) ? "red" : undefined,
          padding: 8,
          flex: 0.75,

          borderTop: "1px solid grey",
          borderLeft: "1px solid grey",
        }}
      >
        {char8}
      </div>
      <div
        style={{
          color: ContainsPunctuation(char4) ? "red" : undefined,
          padding: 8,
          flex: 0.5,
          borderTop: "1px solid grey",
          borderLeft: "1px solid grey",
        }}
      >
        {char4}
      </div>
    </div>
  );
};

function TruncateTo8Characters(str: string): string {
  var newString = RemovePunctuation(str.trim());
  var words = str.split(/(\s)/);

  wordsToRemove.forEach((wordToRemove) => {
    newString = newString.replace(wordToRemove, "");
  });

  newString = newString.replace(/\s+/, "");

  var sortedWords = words.sort((a, b) => (a.length > b.length ? -1 : 1));

  sortedWords.forEach((word) => {
    if (newString.length > 8) {
      newString = newString.replace(word, RemoveVowels(word));
    }
  });

  return newString;
}

function TruncateTo4Characters(str: string): string {
  var newString = RemovePunctuation(str.trim());
  var words = str.split(/\s/);

  wordsToRemove.forEach((wordToRemove) => {
    newString = newString.replace(wordToRemove, "");
  });

  var sortedWords = words.sort((a, b) => (a.length > b.length ? -1 : 1));

  sortedWords.forEach((word) => {
    if (newString.length > 4) {
      newString = newString.replace(word, RemoveVowels(word));
    }
  });

  var sortedTruncatedWords = newString
    .split(/\s/)
    .sort((a, b) => (a.length > b.length ? -1 : 1))
    .map((x) => x.trim())
    .filter((x) => x.length !== 0);

  var shortestWord = sortedTruncatedWords.slice(-1)[0];

  newString = newString.replace(/\s+/gi, "");

  sortedTruncatedWords.forEach((word) => {
    if (newString.length > 4) {
      var newWord = word;
      newString = newString.replace(word, newWord);
    }
  });

  return newString.split("").slice(0, 4).join("");
}

function RemoveVowels(str: string) {
  return str.replace(/[aeiou]/g, "");
}

function ContainsPunctuation(str: string) {
  return str.match(/[^\w\s]/gi) != null;
}

function RemovePunctuation(str: string) {
  return str.replace(/[^\w\s]/gi, "");
}