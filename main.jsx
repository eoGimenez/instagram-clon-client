import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProviderWrapper } from './context/auth.context';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </BrowserRouter>,
);
