import { Navbar, Footer, Services, Welcome, Loader, Transactions } from './components/index'

function App() {

  return (
    <div >
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      {/* <Transactions />
      <Footer /> */}
    </div>
  )
}

export default App
