import { PropsWithChildren } from "react";

import { NextPage } from "next";
import { AppProps } from "next/app";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Provider as ReduxProvider } from "react-redux";

import AppInitializer from "@/shared/components/wrappers/AppInitializer";
import { store } from "@/shared/redux/store";
import { appTheme } from "@/shared/themes/themes";

export type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
  Guard?: (props: PropsWithChildren) => JSX.Element;
  Layout?: (props: PropsWithChildren) => JSX.Element;
};

type TCustomAppProps<P = unknown> = AppProps & {
  Component: NextApplicationPage;
  pageProps: P;
};

export default function App(props: TCustomAppProps) {
  const { Component, pageProps } = props;

  const component = Component.Layout ? (
    <Component.Layout>
      <Component {...pageProps} />
    </Component.Layout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <ReduxProvider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
        <ModalsProvider>
          <AppInitializer>
            <Notifications />
            {Component.Guard ? <Component.Guard>{component}</Component.Guard> : component}
          </AppInitializer>
        </ModalsProvider>
      </MantineProvider>
    </ReduxProvider>
  );
}
