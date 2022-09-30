import React, {useEffect, useState} from 'react';
import style from './Exchange.module.scss';
import s from '../../facades/styles/FacadeStyle.module.scss';
import exchangeArrows from '../../../src/assets/icons/exchange-arrows.svg';
import Select from "./dropdown/Select";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Preloader from '../../facades/preloader/Preloader';
import {getCurrencyTC} from "../../bll/app-reducer";
import {useNavigate} from "react-router";

const Exchange = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {currencies, exchangeResult, isLoading, fromCurrency, toCurrency} = useAppSelector()
    const [amount, setAmount] = useState<string>('1')
    const [sign, setSign] = useState<string | undefined>('₴')

    const convertHandler = () => {
        dispatch(getCurrencyTC(fromCurrency.value, toCurrency.value, amount))
        let signFound = currencies.find(el => el.value === toCurrency.value)
        setSign(signFound?.sign)
    }

    const toAllCurrencies = () => navigate("/all-currencies")

    if (isLoading) return <div className={style.exchange}>
        <div className={style.header}></div>
        <div className={s.body} style={{alignItems: 'center'}}>
            <Preloader/>
        </div>
    </div>

    return <div className={style.exchange}>
        <div className={style.header}></div>
        <div className={s.body}>
            <div className={style.head}>
                <span className={style.title}>Exchange rate</span>
                <span className={style.rate}>{sign}{exchangeResult}</span>
            </div>
            <div className={style.field}>
                <span className={style.subTitle}>Amount</span>
                <input type="number" value={amount} onChange={(e) => setAmount(e.currentTarget.value)}/>
            </div>
            <div className={style.main}>
                <Select label={'From'}/>
                <img src={exchangeArrows} alt="exchange arrows" className={style.arrows}/>
                <Select label={'To'}/>
            </div>
            <div className={style.buttons}>
                <button onClick={convertHandler} className={s.button}>convert</button>
                <button onClick={toAllCurrencies} className={s.button}>current exchange rates</button>
            </div>
        </div>
    </div>
}
export default Exchange;