import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Provider as ReduxProvider } from "react-redux";

import AppInitializer from "@/shared/components/wrappers/AppInitializer";
import { store } from "@/shared/redux/store";
import { appTheme } from "@/shared/themes/themes";
import { TCustomAppProps } from "@/shared/typedefs";

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
