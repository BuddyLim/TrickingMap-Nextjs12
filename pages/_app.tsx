import '../styles/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from '../components/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() =>{
    if(router.pathname === "/"){
      router.push("/tricking-map")
    }
  }, [])

  return(
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default MyApp
