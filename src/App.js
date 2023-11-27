
import NavBar from './components/NavBar';
import MainContainer from './container/MainContainer';
import './style.scss'
import "./App.css"

function App() {
  
  return (
    <>
    <NavBar />
    <div className='page-content'>
    <MainContainer/>
    </div>
    </>
  );
}

export default App;
