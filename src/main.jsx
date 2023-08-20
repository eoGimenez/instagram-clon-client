import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProviderWrapper } from '../context/auth.context';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('app')).render(
	<Router>
		<AuthProviderWrapper>
			<App />
		</AuthProviderWrapper>
	</Router>
);
