import {currencyConverterAPI} from "../api/api";
import {AppThunk} from "./store";
import eu from '../assets/icons/eu.svg';
import gb from '../assets/icons/gb.svg';
import jp from '../assets/icons/jp.svg';
import pl from '../assets/icons/pl.svg';
import ua from '../assets/icons/ua.svg';
import us from '../assets/icons/us.svg';
import {CurrencyToType, CurrencyType} from "../types/types";


const initialState = {
    currencies: [
        {flag: ua, value: 'UAH', sign: '₴', resultTo: '1'},
        {flag: us, value: 'USD', sign: '$', resultTo: '1'},
        {flag: eu, value: 'EUR', sign: '€', resultTo: '1'},
        {flag: gb, value: 'GBP', sign: '£', resultTo: '1'},
        {flag: pl, value: 'PLN', sign: 'zł', resultTo: '1'},
        {flag: jp, value: 'JPY', sign: '¥', resultTo: '1'}
    ],
    exchangeResult: '',
    isLoading: false,
    fromCurrency: {flag: us, value: 'USD'},
    toCurrency: {flag: ua, value: 'UAH'}
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'EXCHANGE-RESULT':
            return {...state, exchangeResult: action.result}
        case 'CURRENCIES':
            return {
                ...state, currencies:
                    state.currencies.map(el => el.value === action.res.value
                        ? ({...el, resultTo: action.res.resultTo}) : el)
            }
        case 'IS-LOADING':
            return {...state, isLoading: action.load}
        case 'FROM-CURRENCY':
            return {...state, fromCurrency: action.from}
        case 'TO-CURRENCY':
            return {...state, toCurrency: action.to}
        default:
            return state
    }
}
export const getCurrencyTC = (from: string, to: string, amount: string): AppThunk => (dispatch) => {
    dispatch(setIsLoadingAC(true))
    currencyConverterAPI.getCurrency(from, to, amount)
        .then((res) => {
            dispatch(setExchangeResultAC(res.data.result.toFixed(2)))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoadingAC(false))
        })
}

export const currenciesWithoutGeneralTC = (currenciesFiltered: CurrencyType[], toCurrency: CurrencyType): AppThunk =>
    (dispatch) => {
        dispatch(setIsLoadingAC(true))
        let count = 0
        currenciesFiltered.forEach(el => {
            currencyConverterAPI.getCurrency(el.value, toCurrency.value, '1')
                .then((res) => {
                    count++
                    dispatch(setCurrenciesAC({
                        value: res.data.query.from,
                        resultTo: res.data.result.toFixed(2)
                    }))
                })
                .catch((err) => {
                    count++
                    console.log(err)
                })
                .finally(() => {
                    count === 5 && dispatch(setIsLoadingAC(false))
                })
        })
    }

export const setExchangeResultAC = (result: number) => ({type: 'EXCHANGE-RESULT', result} as const)
export const setCurrenciesAC = (res: CurrencyToType) => ({type: 'CURRENCIES', res} as const)
export const setIsLoadingAC = (load: boolean) => ({type: 'IS-LOADING', load} as const)
export const setFromCurrencyAC = (from: CurrencyType) => ({type: 'FROM-CURRENCY', from} as const)
export const setToCurrencyAC = (to: CurrencyType) => ({type: 'TO-CURRENCY', to} as const)

export type ExchangeResultAT = ReturnType<typeof setExchangeResultAC>
export type CurrenciesAT = ReturnType<typeof setCurrenciesAC>
export type IsLoadingAT = ReturnType<typeof setIsLoadingAC>
export type FromCurrencyAT = ReturnType<typeof setFromCurrencyAC>
export type ToCurrencyAT = ReturnType<typeof setToCurrencyAC>

export type InitialStateType = {
    currencies: CurrencyType[]
    exchangeResult: string
    isLoading: boolean
    fromCurrency: CurrencyType
    toCurrency: CurrencyType
}

type ActionsType = ExchangeResultAT
    | IsLoadingAT
    | FromCurrencyAT
    | ToCurrencyAT
    | CurrenciesAT
