import { Routes, Route } from 'react-router-dom';
import AdminLogin from './SignIn';

const Auth = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

export default Auth;
