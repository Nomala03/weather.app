import Home from './pages/Home'
import './index.css'
import { registerSW } from './swRegistration'

registerSW()

export default function App() {
  return <Home />
}
