import { Provider } from 'react-redux';
import './App.css';
import { store } from './redux/store';
import Todos from './components/Todos';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from './components/Navabar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Navbar />
        <div className="App flex flex-col justify-center items-center">
          <Provider store={store}>
            <Routes>
              <Route exact path='/' element={<Todos completed={false}/>}/>
              <Route path='/completed' element={<Todos completed={true} />}/>
            </Routes>
          </Provider>
        </div>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
