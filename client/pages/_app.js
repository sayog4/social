import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../lib/useAuth'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  // console.log(ctx?.req?.headers?.cookie)
  pageProps.query = ctx.query
  return { pageProps }
}

export default MyApp
