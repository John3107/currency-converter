import React, {useEffect, useState} from 'react';
import style from "./AllCurrencies.module.scss";
import s from "../../facades/styles/FacadeStyle.module.scss";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {CurrencyType} from "../../types/types";
import Preloader from "../../facades/preloader/Preloader";
import {currenciesWithoutGeneralTC} from "../../bll/app-reducer";

const AllCurrencies = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {currencies, toCurrency, isLoading} = useAppSelector()
    const [currenciesFiltered, setCurrenciesFiltered] = useState<CurrencyType[]>()

    useEffect(() => {
        const currenciesWithoutGeneral = currencies.filter(el => el.value !== toCurrency.value)
        dispatch(currenciesWithoutGeneralTC(currenciesWithoutGeneral, toCurrency))
    }, [dispatch])

    useEffect(() => {
        const currenciesWithoutGeneral = currencies.filter(el => el.value !== toCurrency.value)
        setCurrenciesFiltered(currenciesWithoutGeneral)
    }, [currencies])

    const toConverter = () => navigate("/")

    if (isLoading) return <div className={style.allCurrencies}>
        <div className={style.header}></div>
        <div className={s.body} style={{alignItems: 'center'}}>
            <Preloader/>
        </div>
    </div>

    return <div className={style.allCurrencies}>
        <div className={style.header}>
            <img src={toCurrency.flag} alt={'flag'}/>
        </div>
        <div className={s.body}>
            {
                currenciesFiltered?.map(el => {
                    // в качестве ключа передаю значения, потому что они все уникальные
                    return <div className={style.currency} key={el.value}>
                        <div className={s.cell} style={{margin: '20px 0'}}>
                            <img src={el.flag} alt="flag"/>
                            <span>{el.value}</span>
                        </div>
                        <div className={s.cell} style={{margin: '20px 0', justifyContent: 'center'}}>
                            <span>{el.resultTo}</span>
                        </div>
                    </div>
                })}
            <button onClick={toConverter} className={s.button}>to converter</button>
        </div>
    </div>
}
export default AllCurrencies;