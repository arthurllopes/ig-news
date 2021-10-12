import { Provider } from 'next-auth/client'
import Header from '../components/Header'
import '../styles/global.scss'


function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <Provider session={session}>
    <Header />
    <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
