import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="h-[20%] w-full gap-y-4 bg-[#030406] ">
      <div className="grid h-[90%] w-full grid-cols-8 grid-rows-1">
        <div className="col-span-4 ml-24 mt-4 gap-y-2 text-start text-white">
          <div className="relative h-[25%] w-[25%]">
            <Image src={"/LOGO.png"} alt="Logo" fill />
          </div>

          <h1 className="mt-4 text-[#A4AFBB]">info@form.com</h1>
          <h1 className="text-[#A4AFBB]">882-587-3025</h1>
          <h1 className="text-[#A4AFBB]">6116 Willa River Suite 610</h1>
        </div>
        <div className="col-span-1 mt-4 flex flex-col gap-y-1">
          <h1 className="mb-2 text-white">Menu</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">Home</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">About us</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">Pricing</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">Resources</h1>
        </div>
        <div className="col-span-1 mt-4 flex flex-col gap-y-1">
          <h1 className="mb-2 text-white">Connect</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">Facebook</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">Twitter</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">Instagram</h1>
          <h1 className="text-[#A4AFBB] hover:cursor-pointer hover:underline">LinkedIn</h1>
        </div>
        <div className="col-span-2">
          <div className="mt-4 h-[70%] w-[70%] rounded-lg bg-[#141519] p-4">
            <h1 className="bg-gradient-to-r from-[#E39DFB]  to-[#A0A0FD] bg-clip-text text-lg font-bold text-transparent">Join us</h1>
            <form autoComplete="on">
              <div className="relative mt-4">
                <input
                  type="email"
                  className="borde block w-full rounded-full bg-[#313235] p-4 text-sm text-white"
                  placeholder="Your Email"
                />
                <button
                  type="submit"
                  className="absolute bottom-2.5 right-2.5 rounded-full bg-[#424B5A] px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative mb-4 flex h-[20%] w-full flex-row justify-between bg-[#030406] text-[#505D68]">
        <div className="mx-auto flex flex-row gap-4">
          <h3 className="hover:cursor-pointer hover:underline">Terms and Conditions</h3>
          <h3 className="hover:cursor-pointer hover:underline">Legal</h3>
          <h3 className="hover:cursor-pointer hover:underline">Pattents</h3>
        </div>
        <div className="mx-auto flex flex-row">
          <h3>©2023 - Form | All right reserved</h3>
        </div>
      </div>
    </footer>
  );
};
