import {currencyConverterAPI} from "../api/api";
import {AppThunk} from "./store";
import eu from '../assets/icons/eu.svg';
import gb from '../assets/icons/gb.svg';
import jp from '../assets/icons/jp.svg';
import pl from '../assets/icons/pl.svg';
import ua from '../assets/icons/ua.svg';
import us from '../assets/icons/us.svg';
import {CurrencyType} from "../types/types";


const initialState = {
    currencies: [
        {flag: ua, value: 'UAH', sign: '₴'},
        {flag: us, value: 'USD', sign: '$'},
        {flag: eu, value: 'EUR', sign: '€'},
        {flag: gb, value: 'GBP', sign: '£'},
        {flag: pl, value: 'PLN', sign: 'zł'},
        {flag: jp, value: 'JPY', sign: '¥'},
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
    currencyConverterAPI.getCurrency(to, from, amount)
        .then((res) => {
            dispatch(setExchangeResultAC(res.data.result.toFixed(2)))
            dispatch(setIsLoadingAC(false))
        })
        .catch((err) => {
            dispatch(setIsLoadingAC(false))
            console.log(err)
        })
}

export const setExchangeResultAC = (result: number) => ({type: 'EXCHANGE-RESULT', result} as const)
export const setIsLoadingAC = (load: boolean) => ({type: 'IS-LOADING', load} as const)
export const setFromCurrencyAC = (from: CurrencyType) => ({type: 'FROM-CURRENCY', from} as const)
export const setToCurrencyAC = (to: CurrencyType) => ({type: 'TO-CURRENCY', to} as const)

export type ExchangeResultAT = ReturnType<typeof setExchangeResultAC>
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
