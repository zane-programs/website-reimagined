import { ChakraProvider } from "@chakra-ui/react";

// components
import Head from "next/head";
import Layout from "../components/Layout";

// hooks
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

// scripts
import Script from "next/script";

// util
import NProgress from "nprogress";

// theme
import theme from "../config/theme";

// styles
import "focus-visible/dist/focus-visible"; // focus-visible polyfill
import "../styles/global.css"; // global styles
import "../styles/nprogress.css"; // custom nprogress styling

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const { events: routerEvents } = useRouter();

  useEffect(() => {
    // start/stop NProgress
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // add listeners
    routerEvents.on("routeChangeStart", handleStart);
    routerEvents.on("routeChangeComplete", handleComplete);
    routerEvents.on("routeChangeError", handleComplete);

    // cleanup
    return () => {
      // remove on unmount
      routerEvents.off("routeChangeStart", handleStart);
      routerEvents.off("routeChangeComplete", handleComplete);
      routerEvents.off("routeChangeError", handleComplete);
    };
  }, [routerEvents]);

  // page title (if applicable)
  const title = useMemo(() => Component.title, [Component]);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Head>
          <title>
            Zane St. John
            {title ? " - " + title : ""}
          </title>
          {/* analytics only for production */}
          {process.env.NODE_ENV === "development" ? null : (
            <>
              <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-6DNKEDXG5C"
              />
              <Script id="initAnalytics">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date);gtag("config","G-6DNKEDXG5C");`}
              </Script>
            </>
          )}
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
