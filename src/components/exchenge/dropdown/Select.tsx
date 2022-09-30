import React, {useEffect, useState} from 'react';
import style from './Select.module.scss';
import s from '../../../facades/styles/FacadeStyle.module.scss';
import {useAppSelector} from "../../../hooks/hooks";
import {CurrencyType} from "../../../types/types";
import {useDispatch} from "react-redux";
import {setFromCurrencyAC, setToCurrencyAC} from "../../../bll/app-reducer";

type PropsType = {
    label: string
}

const Select = ({label}: PropsType) => {
    const {currencies, fromCurrency, toCurrency} = useAppSelector()
    const dispatch = useDispatch()

    const [isShowContext, setIsShowContext] = useState<boolean>(false)
    const [currency, setCurrency] = useState<CurrencyType>(label === 'From'
        ? fromCurrency : toCurrency)

    useEffect(() => {
        if (label === 'From') dispatch(setFromCurrencyAC(currency))
        else dispatch(setToCurrencyAC(currency))
    }, [dispatch, currency])

    return <div className={style.select} onClick={() => setIsShowContext(!isShowContext)}>
        <span className={style.label}>{label}</span>
        <div className={s.cell}
             style={{
                 borderBottomLeftRadius: isShowContext ? '0' : '4px',
                 borderBottomRightRadius: isShowContext ? '0' : '4px',
                 cursor: 'pointer'
             }}>
            <img src={currency.flag} alt="flag"/>
            <span>{currency.value}</span>
            <div className={style.arrow}></div>
            {isShowContext && <div className={style.contextMenu}>
                {
                    currencies.map(el =>
                        // в качестве ключа передаю значения, потому что они все уникальные
                        <div key={el.value}
                             className={style.option}
                             onClick={() => setCurrency(el)}>
                            <img src={el.flag} alt="flag"/>
                            <span>{el.value}</span>
                        </div>
                    )}
            </div>}
        </div>
        {isShowContext && <div className={style.listCloser} onClick={() => setIsShowContext(false)}></div>}
    </div>
}
export default Select;