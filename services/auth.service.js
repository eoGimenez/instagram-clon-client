export default class AuthService {
	constructor() {
		this.API_URL = `${import.meta.env.VITE_API_URL}`;
		this.headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('authToken')}`,
		};
	}

	async fetchWithHeaders(url, options) {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Request failed with status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			throw new Error(`Fetch error: ${error.message}`);
		}
	}

	async signup(req) {
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(req),
		};
		return this.fetchWithHeaders(`${this.API_URL}/signup`, options);
	}

	async login(req) {
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(req),
		};
		return this.fetchWithHeaders(`${this.API_URL}/token`, options);
	}

	async verify() {
		const options = {
			method: 'GET',
			headers: this.headers,
		};
		return this.fetchWithHeaders(`${this.API_URL}/users/me/`, options);
	}
}
