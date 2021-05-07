import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

const queryClient = new QueryClient()

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
)

export default App
