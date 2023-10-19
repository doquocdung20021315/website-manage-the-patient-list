import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import './StateIndication.scss';
import StateItem from "./StateItem";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { ISearch } from "../../models/reducers/patients.model";
import { getCountByState, getListPatient, setListPatient } from "../../reducers/slice/listPatientSlice";
import { setListFilterPatient } from "../../reducers/slice/listFilterPatientSlice";
import { setCountByState } from "../../reducers/slice/countByStateSlice";

type Props = {}

export let listStateIndications = [
  {
    id: 0,
    label: "UnRead",
    show: true
  },
  {
    id: 1,
    label: "Reading",
    show: true
  },
  {
    id: 3,
    label: "Read",
    show: true
  },
  {
    id: 5,
    label: "Consulting",
    show: true
  },
  {
    id: 6,
    label: "Consulted",
    show: true
  },
  {
    id: 4,
    label: "Approving",
    show: true
  },
  {
    id: 2,
    label: "Approved",
    show: true
  },
]

const StateIndication = ({ }: Props) => {
  const [check, setCheck] = useState(true)
  const dispatch = useAppDispatch()
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)

  const handleCheckClick = () => {
    setCheck(!check)
    // console.log(listStateIndications)
  }

  const [checkAll, setCheckAll] = useState(true)

  useEffect(() => {
    const cAll = listStateIndications.find(stateIndication => stateIndication.show === false)
    if (cAll === undefined) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  })

  const handleChangeValue = async (value: any) => {
    if (value.target.checked) {
      listStateIndications.forEach(stateIndication => stateIndication.show = true)

      const list = await dispatch(getListPatient({
        ...listPatient,
        status: [0, 1, 2, 3, 4, 5, 6],
        pageIndex: 1
      }))
      const countByState = await dispatch(getCountByState({
        ...listPatient,
        status: [0, 1, 2, 3, 4, 5, 6],
        pageIndex: 1
      }))
      dispatch(setListPatient({
        ...listPatient,
        status: [0, 1, 2, 3, 4, 5, 6],
        pageIndex: 1
      }))
      dispatch(setListFilterPatient(list.payload))
      dispatch(setCountByState(countByState.payload))
    }
    setCheckAll(!checkAll)
  }

  const handleClickValue = async () => {
    listStateIndications.forEach(stateIndication => stateIndication.show = true)

    const list = await dispatch(getListPatient({
      ...listPatient,
      status: [0, 1, 2, 3, 4, 5, 6],
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      status: [0, 1, 2, 3, 4, 5, 6],
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      status: [0, 1, 2, 3, 4, 5, 6],
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    setCheckAll(!checkAll)
  }

  const [active, setActive] = useState(false)

  const handleActive = () => {
    setActive(!active)
  }

  return (
    <div className="state-indication-container">
      {listStateIndications.map((stateIndication, index) => (
        <StateItem
          checkClick={handleCheckClick}
          id={stateIndication.id}
          label={stateIndication.label}
          index={index}
          key={index}
        />
      ))}
      <div className="state-item-container">
        <span>
          <Checkbox
            className='checkbox-orange'
            checked={checkAll}
            onChange={handleChangeValue}
          />
          <span className="state-item-label" onClick={handleClickValue}>
            All
          </span>
        </span>
      </div>
      <div className="exceed-time-container" onClick={handleActive}>
        <span
          className={active ? "exceed-time-text exceed-time-text__active" : "exceed-time-text"}
        >
          List of exceed reading time
        </span>
        <span
          className={active ? "exceed-time-number exceed-time-number__active" : "exceed-time-number"}
        >
          0
        </span>
      </div>
      <Select
        placeholder="Trạng thái đồng bộ HIS"
        allowClear={true}
        options={[
          { value: 'Tất cả', label: 'Tất cả' },
          { value: 'Đồng bộ HIS', label: 'Đồng bộ HIS' },
          { value: 'Chưa đồng bộ HIS', label: 'Chưa đồng bộ HIS' },
          { value: 'Đã gửi kết quả', label: 'Đã gửi kết quả' },
          { value: 'Chưa gửi kết quả', label: 'Chưa gửi kết quả' },
        ]}
      />
    </div>
  );
};

export default StateIndication;
