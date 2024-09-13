import React from "react";

import Head from "next/head";

import { APP_NAME, APP_DESCRIPTION } from "@/shared/constants/app.constants";

const NextHead: React.FC<{ title?: string; description?: string }> = ({
  title = APP_NAME,
  description = APP_DESCRIPTION,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default NextHead;
