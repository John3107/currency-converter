import React, {useEffect} from 'react';
import Exchange from "./components/exchenge/Exchange";
import style from "./App.module.scss";
import AllCurrencies from "./components/allCurrencies/AllCurrencies";
import {Route, Routes} from "react-router";
import {useAppDispatch} from "./hooks/hooks";
import {getCurrencyTC} from "./bll/app-reducer";

const App = () => {
const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCurrencyTC('USD', 'UAH', '1'))
    }, [dispatch])

    return <div className={style.app}>
        <Routes>
            <Route path="/*" element={<Exchange/>}/>
            <Route path="/all-currencies" element={<AllCurrencies/>}/>
        </Routes>
    </div>
}
export default App;