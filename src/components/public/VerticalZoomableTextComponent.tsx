import Image from "next/image";
import { useState } from "react";

export const VerticalZoomableTextComponent = () => {
  const verticalZoomableTextBody = [
    {
      number: "01.",
      title: "Security and Confidentiality",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "02.",
      title: "Firm-Focused Approach",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "03.",
      title: "Expert Support",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "04.",
      title: "Proven Track Record",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
  ];
  const [selected, useSelected] = useState(1);
  return (
    <div className="flex h-full flex-col gap-y-6 pt-12">
      {verticalZoomableTextBody.map((item, index) => (
        <div
          className={`${
            selected === index ? "w-[40%] " : "w-[30%] border-2 border-x-0 border-b-0 border-[#4E5465]"
          } flex cursor-pointer flex-col `}
          onClick={() => {
            useSelected(index);
          }}
          key={index}
        >
          {selected === index && (
            <div className=" relative flex w-full justify-center">
              <Image className="relative" src="/line.png" alt="React Picture" height={10} width={1000} />
            </div>
          )}
          <h2 className="text-[#8F92AB]">{item.number}</h2>
          <h1 className={`${selected === index ? "text-lg text-white" : "text-[#8F92AB]"}`}>{item.title}</h1>
          {selected === index && <p className="text-[#8F92AB]">{item.text}</p>}
        </div>
      ))}
    </div>
  );
};
