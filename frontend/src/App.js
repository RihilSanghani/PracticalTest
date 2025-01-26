import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Cookies from 'js-cookie';
import CreateForm from './Pages/CreateForm';
import FormList from './Pages/FormList';

function App() {
  const authToken = Cookies.get('authToken');

  return (
    <>
      <Routes>
        {
          !authToken ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          ) :
            (
              <>
                <Route path="/createform" element={<CreateForm />} />
                <Route path="/" element={<FormList />} />
              </>
            )
        }

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
