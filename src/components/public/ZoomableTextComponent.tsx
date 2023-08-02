import Image from "next/image";
import { useState } from "react";

export const ZoomableTextComponent = () => {
  const zoomableTextBody = [
    {
      number: "01.",
      title: "Efficient Influence Resolution",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "02.",
      title: "Secure Communication",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "03.",
      title: "Streamlined Case Management",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "04.",
      title: "Mediation and Negotiation Support",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
    {
      number: "05.",
      title: "Access to Legal Resources",
      text: "We envision a future where artificial intelligence and advanced technology drive efficiency and change the way disputes are resolved. We use artificial intelligence to improve communication, automate tasks, and speed up the problem-solving process, ultimately leading to more effective results.",
    },
  ];
  const [selected, useSelected] = useState(0);
  return (
    <>
      {zoomableTextBody.map((item, index) => (
        <div
          className={`${
            selected === index ? "w-[30%] " : "w-[20%] border-2 border-x-0 border-b-0 border-[#4E5465]"
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
    </>
  );
};
