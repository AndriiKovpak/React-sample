import "symbol-observable";

import "../components/dashboard/CalendarComponent.css";
import "./global.css";

import { StoreProvider } from "easy-peasy";
import type { AppProps } from "next/app";
import type { FC } from "react";
import Modal from "react-modal";
import { nextReduxWrapper } from "../store/global.store";

Modal.setAppElement("#__next");

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const { store, props } = nextReduxWrapper.useWrappedStore(pageProps);
  return (
    <StoreProvider store={store}>
      <Component {...props} />
    </StoreProvider>
  );
};

export default MyApp;
