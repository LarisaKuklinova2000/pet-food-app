class ApiService {
    _apiBase = 'https://api.react-learning.ru';
    _apiSignUp = 'https://api.react-learning.ru/signup';
    _apiSignIn = 'https://api.react-learning.ru/signin'
    _apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IxNTdkMjU5Yjk4YjAzOGY3N2EzZjUiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MjU2Njg4MywiZXhwIjoxNzA0MTAyODgzfQ.edwgx9NbW_ceLXfG-_xDoOalY4Q_6Rd0KQkYvkgYENo';
    _apiEmail = 'gnosticism100500@gmail.com';
    _apiPassword = '1234'

    signUp = async (email, group, password) => {
        const result = await fetch(this._apiSignUp, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: {
                "email": email,
                "group": group,
                "password": password
            }
        });
        return await result.json();
    };

    signIn = async (email, password) => {
        const result = await fetch(this._apiSignIn, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: {
                "email": email,
                "password": password
            }
        });
        return await result.json();
    };

    getResource = async (url) => {
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${this._apiToken}`
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllProducts = async () => {
        const result = await this.getResource(`${this._apiBase}/products`)
        return result
    }

}

export default ApiService;