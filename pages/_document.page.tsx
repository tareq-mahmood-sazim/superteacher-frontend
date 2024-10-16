import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static override getInitialProps = getInitialProps;

  override render() {
    return (
      <Html>
        <Head />
        <body className="bg-[#141932] text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
