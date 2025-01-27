import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import CreateForm from './Pages/CreateForm';
import FormList from './Pages/FormList';
import EditForms from './Pages/EditForms';

function App() {
  const authToken = localStorage.getItem('authToken');


  return (
    <>
      <Routes>
        {/* Public Routes */}
        {!authToken ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          // Redirect logged-in users from public routes
          <>
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Protected Routes */}
        {authToken ? (
          <>
            <Route path="/" element={<FormList />} />
            <Route path="/createform" element={<CreateForm />} />
            <Route path="/editform/:id" element={<EditForms />} />
          </>
        ) : (
          // Redirect unauthorized users to login
          <>
            <Route path="/createform" element={<Navigate to="/login" replace />} />
            <Route path="/editform/:id" element={<Navigate to="/login" replace />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
