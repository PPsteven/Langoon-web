import classNames from "classnames";

export interface LineObj {
  raw: string;
  translation: string;
  isSelected: boolean;
  start: number;
  end: number;
}

interface LineProps {
  obj: LineObj;
  isActive: boolean;
  lineNo: number;
}

const Line = (props: LineProps) => {
  return (
    <div className="box-border px-12">
      <span
        className={classNames(
          props.isActive ? "text-white shadow-xl active" : "text-gray-400"
        )}
        id={"line" + props.lineNo}
      >
        {props.obj.raw}
      </span>
    </div>
  );
};

export const Text = () => {
  const lines: LineObj[] = [
    {
      raw: "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever sinc",
      translation: "Comment ça va?",
      isSelected: false,
      start: 0,
      end: 5,
    },
    {
      raw: "Whenever you feel like criticizing any one, just remember that all the people in this world haven’t had the advantages that you’ve had",
      translation: "Bonjour",
      isSelected: false,
      start: 5,
      end: 10,
    },
    {
      raw: "He didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that",
      translation: "Je vais bien, merci!",
      isSelected: true,
      start: 10,
      end: 13,
    },
    {
      raw: ">He didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that",
      translation: "Je vais bien, merci!",
      isSelected: false,
      start: 14,
      end: 15,
    },
    {
      raw: "He didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that",
      translation: "Je vais bien, merci!",
      isSelected: false,
      start: 15,
      end: 18,
    },
    {
      raw: "He didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that",
      translation: "Je vais bien, merci!",
      isSelected: false,
      start: 18,
      end: 25,
    },
    {
      raw: "He didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that",
      translation: "Je vais bien, merci!",
      isSelected: false,
      start: 18,
      end: 25,
    },
    {
      raw: "END didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that",
      translation: "Je vais bien, merci!",
      isSelected: false,
      start: 18,
      end: 25,
    },
  ];

  return (
    <div className="w-full h-full box-border overflow-y-auto bg-none">
      <div className="flex flex-col gap-5 ml-4 font-bold text-2xl text-start">
        {lines.map((line, i) => {
          return <Line obj={line} isActive={false} lineNo={i} />;
        })}
      </div>
    </div>
  );
};
