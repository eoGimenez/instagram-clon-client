import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProviderWrapper } from '../context/auth.context';

createRoot(document.getElementById('app')).render(
	<AuthProviderWrapper>
		<App />
	</AuthProviderWrapper>
);
