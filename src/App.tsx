import Home from './pages/Home'
import './index.css'
import { registerSW } from './swRegistration'

registerSW()
export default function App() {
  return (
     <main className="w-full flex justify-center items-center bg-gradient-to-br">
  <Home />
  </main>
  )
}
