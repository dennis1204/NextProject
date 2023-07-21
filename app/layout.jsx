import '@/styles/globals.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';

export const metadata = {
    title: "MyNextProject",
    description: 'AI Prompts Hub'
};
const RootLayout = ({children}) => {
  return (
    <html lang='en' suppressHydrationWarning={true} >
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
};

export default RootLayout;