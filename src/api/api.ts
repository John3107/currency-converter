import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.apilayer.com/exchangerates_data/',
    headers: {
        "apikey": "nq4rkG7eNJm1JAMF4m8aL5UyN3zI0vRk"
    }
})


export const currencyConverterAPI = {
    getCurrency(from: string, to: string, amount: string) {
        return instance.get(`convert?to=${to}&from=${from}&amount=${amount}`);
    }
}