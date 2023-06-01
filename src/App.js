import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Game from "./components/Game";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Game />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;