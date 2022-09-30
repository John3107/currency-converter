import type {AppDispatch} from '../bll/store';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {InitialStateType} from "../bll/app-reducer";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = () => useSelector<AppRootStateType, InitialStateType>(state => state.app)
