class ApiService {
    _apiBase = 'https://api.react-learning.ru';
    _apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IxNTdkMjU5Yjk4YjAzOGY3N2EzZjUiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MjU2Njg4MywiZXhwIjoxNzA0MTAyODgzfQ.edwgx9NbW_ceLXfG-_xDoOalY4Q_6Rd0KQkYvkgYENo';
    _apiEmail = 'gnosticism100500@gmail.com';
    _apiPassword = '1234'

    postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data //тут будут данные из формы авторизации
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