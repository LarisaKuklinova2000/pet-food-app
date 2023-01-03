class ApiService {
    _apiBase = 'https://api.react-learning.ru';
    _apiSignUp = 'https://api.react-learning.ru/signup';
    _apiSignIn = 'https://api.react-learning.ru/signin'

    signUp = async (body) => {
        const result = await fetch(this._apiSignUp, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await result.json();
    };

    signIn = async (body) => {
        const result = await fetch(this._apiSignIn, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await result.json();
    };

    getResource = async (url, token) => {
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllProducts = async (token) => {
        const result = await this.getResource(`${this._apiBase}/products`, token)
        return result
    }

}

export default ApiService;