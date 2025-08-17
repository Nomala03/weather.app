import Home from './pages/Home'
import './index.css'
import { registerSW } from './swRegistration'

registerSW()
export default function App() {
  return (
    <main className="flex w-full items-center justify-center bg-gradient-to-br">
      <Home />
    </main>
  )
}
