import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
// import { getWord } from "@/utils/api";
// import { handleRespWithNotifySuccess } from "@/utils/handle_resp";
// import { WordDict } from "@/types/nlp";
import { X as CloseIcon, Volume2 } from "lucide-react";
import { useClickAway } from "ahooks";
import React from "react";
import { type WordType, mockData } from "./mock"
import useSound from 'use-sound';

interface DictPropsType {
  /** @name 分词单词*/
  word: string;
}

export const Dict = React.memo((props: DictPropsType) => {
  const [open, setOpen] = useState(false);
  const { word } = props;

  const ref = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    close();
  }, [ref, document.querySelector("#text-container")]);

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    word && setOpen(true);
  }, [word]);

  return (
    <div
      className={classNames(
        "w-[300px] h-full fixed right-0 z-10 bg-white p-4",
        open ? "block" : "hidden"
      )}
      ref={ref}
    >
      <div className="flex flex-col">
        <h1 className="flex items-center text-xl font-bold p-2">
          <button onClick={close} >
            <CloseIcon />
          </button>
          词典
        </h1>
        <DictCard word={word} />
      </div>
    </div>
  );
})


const DictCard = (props: any) => {
  const { word } = props;

  const wordExplains = mockData as WordType[];

  return (
    <div className="card bg-base-100 p-2">
      <div className="p-1">{word}</div>
      {wordExplains.map((word) => {
        const { phonetics } = word;
        return phonetics.map((phonetic, phoneticIndex) => {
          const { text, audio } = phonetic;
          return <AudioPlayer key={text + phoneticIndex} audioSrc={audio} text={text} />
        })
      })}
    </div>
  )
};

const extractLanguage = (str: string) => {
  const regrex = /\-(.*)\.mp3$/;
  const match = str.match(regrex);
  if (match) {
    return match[1];
  }
  return "";
}

interface AudioPlayerType {
  audioSrc: string;
  text: string;
}

const AudioPlayer = (props: AudioPlayerType) => {
  const { audioSrc, text } = props;
  const [play] = useSound(audioSrc);
  const langTag = extractLanguage(audioSrc)
  return (
    <div className="flex items-center gap-3 py-2 px-2">
      <span className="border-2 border-solid border-gray-500 px-1 rounded-md">{langTag}</span>
      <span className="text">{text}</span>
      <Volume2 onClick={play} size={16} />
    </div>
  )
}