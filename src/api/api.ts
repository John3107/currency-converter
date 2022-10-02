import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.apilayer.com/exchangerates_data/',
    headers: {
        "apikey": "J52NzgJHdx6TTU3ht7haXcUSTKIAxcq6"
    }
})


export const currencyConverterAPI = {
    getCurrency(from: string, to: string, amount: string) {
        return instance.get(`convert?to=${to}&from=${from}&amount=${amount}`);
    }
}