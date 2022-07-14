import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import User from '../pages/User';
import About from '../pages/About';
import Alert from './shared/Alert'
import NotFound from '../pages/NotFound';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';

const App = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='container mx-auto px-3 pb-12'>
        <Alert />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route index element={<Home />} />
          <Route path='/users/:login' element={<User />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
export default App;
