import { ChakraProvider } from "@chakra-ui/react";

// components
import Head from "next/head";
import Layout from "../components/Layout";
import Cursor from "../components/Cursor";

// hooks
import { useEffect } from "react";
import { useRouter } from "next/router";

// util
import NProgress from "nprogress";

// styles
import "../styles/global.css";
import "../styles/nprogress.css";

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const { events: routerEvents } = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    routerEvents.on("routeChangeStart", handleStart);
    routerEvents.on("routeChangeComplete", handleComplete);
    routerEvents.on("routeChangeError", handleComplete);

    // cleanup
    return () => {
      routerEvents.off("routeChangeStart", handleStart);
      routerEvents.off("routeChangeComplete", handleComplete);
      routerEvents.off("routeChangeError", handleComplete);
    };
  }, [routerEvents]);

  // page title if applicable
  const { title } = Component;

  return (
    <ChakraProvider>
      <Cursor />
      <Layout>
        <Head>
          <title>
            Zane St. John
            {title ? " - " + title : ""}
          </title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
