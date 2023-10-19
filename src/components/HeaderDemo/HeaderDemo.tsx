import {
  BookOutlined, CloseOutlined, CloudUploadOutlined, DashboardOutlined, FileOutlined,
  FileTextOutlined, GlobalOutlined, InfoCircleOutlined, KeyOutlined, LockOutlined,
  LogoutOutlined, SettingFilled, SwapOutlined, SyncOutlined, UserOutlined
} from '@ant-design/icons';
import { DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISearch } from '../../models/reducers/patients.model';
import { setListFilterPatient } from '../../reducers/slice/listFilterPatientSlice';
import { getCountByState, getListPatient, setListPatient } from '../../reducers/slice/listPatientSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import './HeaderDemo.scss';
import Logo from './logodemo.png';
import { setCountByState } from '../../reducers/slice/countByStateSlice';

type Props = {}

const HeaderDemo = ({ }: Props) => {
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)

  const [todayActive, setTodayActive] = useState(true)
  const [yesterdayActive, setYesterdayActive] = useState(false)
  const [weekActive, setWeekActive] = useState(false)
  const [monthActive, setMonthActive] = useState(false)
  const [allActive, setAllActive] = useState(false)

  const [inputIdValue, setInputIdValue] = useState("")
  const [inputNameValue, setInputNameValue] = useState("")
  const [timeFrom, setTimeFrom] = useState(dayjs(moment().format()))
  const [timeTo, setTimeTo] = useState(dayjs(moment().format()))

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleChangeInputId = (e: any) => {
    setInputIdValue(e.target.value)
  }

  const handleEnterInputId = async (e: any) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      pCode: e.target.value,
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      pCode: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      pCode: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Id: ', e.target.value)
  }

  const handleChangeInputName = (e: any) => {
    setInputNameValue(e.target.value)
  }

  const handleEnterInputName = async (e: any) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      pName: e.target.value,
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      pName: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      pName: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Name: ', e.target.value)
  }

  const handleTodayActive = async () => {
    setTodayActive(true)
    setYesterdayActive(false)
    setWeekActive(false)
    setMonthActive(false)
    setAllActive(false)

    const today = moment()

    setTimeFrom(dayjs(today.format()))
    setTimeTo(dayjs(today.format()))

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Today', list.payload);
    console.log('Today count', countByState.payload);
  }

  const handleYesterdayActive = async () => {
    setTodayActive(false)
    setYesterdayActive(true)
    setWeekActive(false)
    setMonthActive(false)
    setAllActive(false)

    const yesterday = moment().subtract(1, 'days')

    setTimeFrom(dayjs(yesterday.format()))
    setTimeTo(dayjs(yesterday.format()))

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: yesterday.format('YYYY-MM-DD'),
      toDate: yesterday.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: yesterday.format('YYYY-MM-DD'),
      toDate: yesterday.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: yesterday.format('YYYY-MM-DD'),
      toDate: yesterday.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Yesterday', list.payload);
    console.log('Yesterday count', countByState.payload);
  }

  const handleWeekActive = async () => {
    setTodayActive(false)
    setYesterdayActive(false)
    setWeekActive(true)
    setMonthActive(false)
    setAllActive(false)

    const fDate = moment().subtract(6, 'days')
    const tDate = moment()

    setTimeFrom(dayjs(fDate.format()))
    setTimeTo(dayjs(tDate.format()))

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('-7 Days', list.payload);
    console.log('-7 Days count', countByState.payload);
  }

  const handleMonthActive = async () => {
    setTodayActive(false)
    setYesterdayActive(false)
    setWeekActive(false)
    setMonthActive(true)
    setAllActive(false)

    const fDate = moment().subtract(30, 'days')
    const tDate = moment()

    setTimeFrom(dayjs(fDate.format()))
    setTimeTo(dayjs(tDate.format()))

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('-30 Days', list.payload);
    console.log('-30 Days count', countByState.payload);
  }

  const handleAllActive = async () => {
    setTodayActive(false)
    setYesterdayActive(false)
    setWeekActive(false)
    setMonthActive(false)
    setAllActive(true)

    const fDate = moment().subtract(365 * 20, 'days')
    const tDate = moment()

    setTimeFrom(dayjs(fDate.format()))
    setTimeTo(dayjs(tDate.format()))

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: fDate.format('YYYY-MM-DD'),
      toDate: tDate.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('All', list.payload);
    console.log('All count', countByState.payload);
  }

  const onChangeTimeFrom = async (date: any, dateString: any) => {
    console.log(date)
    console.log('from', dateString)

    setTimeFrom(date)

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: date.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: date.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: date.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('From count', countByState.payload);
  }

  const onChangeTimeTo = async (date: any, dateString: any) => {
    console.log(date)
    console.log('to', dateString)

    setTimeTo(date)

    const list = await dispatch(getListPatient({
      ...listPatient,
      toDate: date.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      toDate: date.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      toDate: date.format('YYYY-MM-DD'),
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('To count', countByState.payload);
  }

  const handleClickClose = async () => {
    setInputIdValue("")
    setInputNameValue("")

    setTodayActive(true)
    setYesterdayActive(false)
    setWeekActive(false)
    setMonthActive(false)
    setAllActive(false)

    const today = moment()

    setTimeFrom(dayjs(today.format()))
    setTimeTo(dayjs(today.format()))

    const list = await dispatch(getListPatient({
      ...listPatient,
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.format('YYYY-MM-DD'),
      pCode: "",
      pName: "",
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.format('YYYY-MM-DD'),
      pCode: "",
      pName: "",
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.format('YYYY-MM-DD'),
      pCode: "",
      pName: "",
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))
  }

  useEffect(() => {
    if (timeFrom.format("DD/MM/YYYY") === moment().format("DD/MM/YYYY") &&
      timeTo.format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
    ) {
      setTodayActive(true)
      setYesterdayActive(false)
      setWeekActive(false)
      setMonthActive(false)
      setAllActive(false)
    } else {
      setTodayActive(false)
    }

    if (timeFrom.format("DD/MM/YYYY") === moment().subtract(1, 'days').format("DD/MM/YYYY") &&
      timeTo.format("DD/MM/YYYY") === moment().subtract(1, 'days').format("DD/MM/YYYY")
    ) {
      setTodayActive(false)
      setYesterdayActive(true)
      setWeekActive(false)
      setMonthActive(false)
      setAllActive(false)
    } else {
      setYesterdayActive(false)
    }

    if (timeFrom.format("DD/MM/YYYY") === moment().subtract(6, 'days').format("DD/MM/YYYY") &&
      timeTo.format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
    ) {
      setTodayActive(false)
      setYesterdayActive(false)
      setWeekActive(true)
      setMonthActive(false)
      setAllActive(false)
    } else {
      setWeekActive(false)
    }

    if (timeFrom.format("DD/MM/YYYY") === moment().subtract(30, 'days').format("DD/MM/YYYY") &&
      timeTo.format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
    ) {
      setTodayActive(false)
      setYesterdayActive(false)
      setWeekActive(false)
      setMonthActive(true)
      setAllActive(false)
    } else {
      setMonthActive(false)
    }

    if (timeFrom.format("DD/MM/YYYY") === moment().subtract(365 * 20, 'days').format("DD/MM/YYYY") &&
      timeTo.format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
    ) {
      setTodayActive(false)
      setYesterdayActive(false)
      setWeekActive(false)
      setMonthActive(false)
      setAllActive(true)
    } else {
      setAllActive(false)
    }

    return () => { }
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className='header-demo'>
      <div className='logo-container'>
        <img src={Logo} alt="logo" />
        <span className='logo-text'>VRPACS-RIS</span>
      </div>
      <div className="header-middle-container">
        <div className='header-middle'>
          <Input
            className='text-input text-id'
            placeholder="Patient ID"
            allowClear={true}
            value={inputIdValue}
            onChange={handleChangeInputId}
            onPressEnter={handleEnterInputId}
          />
          <Input
            className='text-input text-name'
            placeholder="Patient Name"
            allowClear={true}
            value={inputNameValue}
            onChange={handleChangeInputName}
            onPressEnter={handleEnterInputName}
          />
          <div
            className={todayActive ? 'time-btn time-btn__active' : 'time-btn'}
            onClick={handleTodayActive}
          >
            Today
          </div>
          <div
            className={yesterdayActive ? 'time-btn time-btn__active' : 'time-btn'}
            onClick={handleYesterdayActive}
          >
            Yesterday
          </div>
          <div
            className={weekActive ? 'time-btn time-btn__active' : 'time-btn'}
            onClick={handleWeekActive}
          >
            -7 Days
          </div>
          <div
            className={monthActive ? 'time-btn time-btn__active' : 'time-btn'}
            onClick={handleMonthActive}
          >
            -30 Days
          </div>
          <div
            className={allActive ? 'time-btn time-btn__active' : 'time-btn'}
            onClick={handleAllActive}
          >
            All
          </div>
          <div className='time-date'>
            <DatePicker
              value={timeFrom}
              size='small'
              suffixIcon={null}
              format={"DD/MM/YYYY"}
              allowClear={false}
              onChange={onChangeTimeFrom}
            />
          </div>
          <div className='time-space'>
            -
          </div>
          <div className='time-date'>
            <DatePicker
              value={timeTo}
              size='small'
              suffixIcon={null}
              format={"DD/MM/YYYY"}
              allowClear={false}
              onChange={onChangeTimeTo}
            />
          </div>
          <div className='button'>
            <CloseOutlined onClick={handleClickClose}/>
          </div>
          <div className='button'>
            <SyncOutlined />
          </div>
          <div className='button'>
            <CloudUploadOutlined />
          </div>
          <div className='button'>
            <SettingFilled />
          </div>
          <div className='button'>
            <SwapOutlined />
          </div>
        </div>
        <div className='account-container'>
          <div className='account-avatar'>
            <div className='account-text'>
              Dr. Admin
            </div>
            <div className='account-icon'>
              <UserOutlined />
            </div>
          </div>
          <ul className='account-setting'>
            <li className='account-setting-item'>
              <UserOutlined className='account-setting-icon' />
              Dr. Admin
            </li>
            <li className='account-setting-item'>
              <GlobalOutlined className='account-setting-icon' />
              Change language
            </li>
            <li className='account-setting-item'>
              <KeyOutlined className='account-setting-icon' />
              Change password
            </li>
            <li className='account-setting-item'>
              <LockOutlined className='account-setting-icon' />
              Signature register
            </li>
            <li className='account-setting-item'>
              <FileOutlined className='account-setting-icon' />
              Management sample results
            </li>
            <li className='account-setting-item'>
              <FileTextOutlined className='account-setting-icon' />
              Commitment form
            </li>
            <li className='account-setting-item'>
              <DashboardOutlined className='account-setting-icon' />
              Statistical
            </li>
            <li className='account-setting-item'>
              <BookOutlined className='account-setting-icon' />
              User Manual
            </li>
            <li className='account-setting-item'>
              <InfoCircleOutlined className='account-setting-icon' />
              Version info
            </li>
            <li className='account-setting-item' onClick={handleLogout}>
              <LogoutOutlined className='account-setting-icon' />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeaderDemo;
