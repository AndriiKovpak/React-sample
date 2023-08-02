import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";

export const NoSidebarLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Head>
      <title>React</title>
      <meta name="description" content="React ChatGPT Tester" />
    </Head>
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow overflow-y-auto bg-gray-200">{children}</main>
      <ToastContainer />
    </div>
  </>
);
