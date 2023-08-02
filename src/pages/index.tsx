import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { Navbar } from "src/components/layout/Navbar";
import { CustomerReviewSlider } from "src/components/public/CustomerReviewsSlider";
import { VerticalZoomableTextComponent } from "src/components/public/VerticalZoomableTextComponent";
import { ZoomableTextComponent } from "src/components/public/ZoomableTextComponent";
import { Footer } from "../components/layout/Footer";

export async function getStaticProps() {
  return { props: {} };
}

const Page: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Register",
      onClick: () => setActiveStep(0),
      imageSrc: "/slide.png",
    },
    {
      title: "Set up",
      onClick: () => setActiveStep(1),
      imageSrc: "/slide2.png",
    },
    {
      title: "Set up",
      onClick: () => setActiveStep(2),
      imageSrc: "/slide3.png",
    },
    {
      title: "Set up",
      onClick: () => setActiveStep(3),
      imageSrc: "/slide4.png",
    },
  ];

  return (
    <div className="h-screen">
      <Navbar />
      <header className="flex h-[50%] flex-col items-center justify-center gap-y-12  bg-[#0B0C11] pt-16 text-center">
        <h1 className="text-6xl text-white">
          Advance your lobbying with
          <span className="bg-gradient-to-r from-[#82EDC0] via-[#A7ACF2] to-[#82EDC0] bg-clip-text text-transparent">
            <br /> AI-empowered influence
          </span>
        </h1>
        <p className="text-[#8F92AB]">
          Streamline government institution data in one centralized platform, <br />
          powered by AI, for enhanced efficiency and client success.
        </p>
        <button className="mb-12 h-10 w-[7%] rounded-full bg-white text-lg font-bold text-[#3C38CE] shadow-[0px_4px_16px_rgba(60,56,206,0.5),_0px_8px_24px_rgba(60,56,206,0.5),_0px_16px_56px_rgba(60,56,206,0.5)]">
          Start Now!
        </button>
      </header>
      <div className="flex h-[70%] w-full items-center justify-center bg-black bg-[url('/bg_mid_1.png')] bg-cover bg-no-repeat bg-blend-normal">
        <div className="relative mt-6 flex h-full w-[60%] items-end justify-center">
          <Image src="/bg_mid_2.png" alt="React Picture" fill />
        </div>
      </div>
      <div className="grid h-[95%] w-full grid-cols-2 grid-rows-2 justify-items-center bg-[#030406] pt-24">
        <div className="col-span-1 flex w-[75%] flex-col gap-y-2 justify-self-end">
          <p className="bg-gradient-to-r from-[#CD8DFF] to-[#7680FF] bg-clip-text text-xl font-bold text-transparent">Main functions: </p>
          <h1 className="text-4xl text-white">
            Unlock Efficiency and Save Time with React: <br /> Your Ultimate Lobbying Solution
          </h1>
          <p className="mt-6 w-[70%] text-[#4E5465]">
            React revolutionizes the way you exert influence, leveraging cutting-edge AI technology to significantly reduce the time and
            effort required. Say goodbye to laborious manual processes and embrace a seamless, automated solution that delivers faster
            outcomes while optimizing your valuable resources.
          </p>
          <button className="mt-6 h-10 w-[20%] rounded-full bg-[#4950BD] text-lg font-bold text-white shadow-[0px_4px_16px_rgba(60,56,206,0.5),_0px_8px_24px_rgba(60,56,206,0.5),_0px_16px_56px_rgba(60,56,206,0.5)]">
            Start Now!
          </button>
        </div>

        <div className="col-span-1 h-full w-[75%] justify-self-start">
          <div className="relative flex h-[80%] w-[70%] justify-center">
            <Image src="/main_functions.png" alt="React Picture" fill quality={100} />
          </div>
        </div>
        <div className="col-span-2 mt-12 flex h-[60%] w-[75%] flex-row justify-around gap-x-4">
          <ZoomableTextComponent />
        </div>
      </div>
      <div className="flex h-[30%] w-full justify-center bg-[#030406]">
        <div className="w-[80%] bg-[url('/bg_numbers.png')] bg-auto bg-center bg-no-repeat"></div>
      </div>
      <div className="flex h-[80%] flex-col items-center justify-center bg-[#030406] text-center">
        <h2 className="bg-gradient-to-r from-[#8CB7FF] to-[#00FFD1]  bg-clip-text text-lg font-bold text-transparent">How it works</h2>
        <h1 className="mt-4 text-5xl font-bold text-white">
          Start working with us <br /> in a few clicks
        </h1>
        <div className="mt-6 flex">
          {steps.map((step, index) => (
            <div className="relative flex flex-1 cursor-pointer flex-col" onClick={() => setActiveStep(index)} key={index}>
              <div>
                <div
                  className={
                    activeStep == index ? "rounded-full px-14 text-lg font-bold text-white" : "rounded-full px-14 text-lg text-[#4E5465]"
                  }
                >
                  {index + 1}
                </div>
              </div>
              <div className={activeStep == index ? "text-white" : "text-[#4E5465]"}>{step.title}</div>
              {index < steps.length - 1 && <div className="absolute left-[4.5rem] top-3 h-0 w-24 border border-[#4E5465]"></div>}
            </div>
          ))}
        </div>
        <div className="relative mt-6 flex h-[65%] w-[50%] justify-center">
          <Image src={steps[activeStep].imageSrc} alt="Slide" fill />
        </div>
      </div>
      <div className="h-[30%] w-full items-center justify-center bg-[#030406] pt-16 text-center">
        <h2 className="bg-gradient-to-r from-[#3699FF] to-[#FF5353]  bg-clip-text text-lg font-bold text-transparent ">Customer Reviews</h2>
        <h1 className="mt-4 text-5xl font-bold text-white">
          Our customers make the <br /> impossible possible
        </h1>
      </div>

      <CustomerReviewSlider />
      <div className="flex h-[50%] justify-center bg-[#14181E]">
        <div className="flex w-full flex-row justify-center">
          <div className="mt-12">
            <h3 className="bg-gradient-to-r from-[#FF9393] to-[#7BD7FF] bg-clip-text text-lg text-transparent">Who We Are</h3>
            <h1 className="h-[30%] bg-[url('/bg_who_we_are.png')] bg-cover bg-no-repeat  pt-4 text-4xl text-white ">
              Why choose <br /> React ?
            </h1>
          </div>
        </div>
        <VerticalZoomableTextComponent />
      </div>
      <div className="b flex h-[30%] w-full flex-col justify-center gap-y-4 border-b border-b-[#9099A3] bg-[#030406] pb-4 pt-6 text-center">
        <h1 className="text-4xl text-white">Start using React today</h1>
        <p className="mx-auto w-[30%] text-[#9099A3]">
          Your information is secure and encrypted, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliquat enim ad minim.
        </p>
        <button className="mx-auto mt-6 h-12 w-[8%] rounded-full bg-[#4950BD] text-lg font-bold text-white shadow-[0px_4px_16px_rgba(60,56,206,0.5),_0px_8px_24px_rgba(60,56,206,0.5),_0px_16px_56px_rgba(60,56,206,0.5)]">
          Get Started
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
