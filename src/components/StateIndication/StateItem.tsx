import { Checkbox } from "antd";
import './StateItem.scss';
// import { useState, useEffect } from "react";
import { listStateIndications } from "./StateIndication";
import { ICountByState, ISearch } from "../../models/reducers/patients.model";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getCountByState, getListPatient, setListPatient } from "../../reducers/slice/listPatientSlice";
import { setListFilterPatient } from "../../reducers/slice/listFilterPatientSlice";
import { setCountByState } from "../../reducers/slice/countByStateSlice";

type Props = {
  checkClick(): void
  id: number
  label: string
  index: number
}

const StateItem = ({ checkClick, id, label, index }: Props) => {
  const countState: Array<ICountByState> = useAppSelector((state: RootState) => state.countByState)
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)
  const dispatch = useAppDispatch()
  // const [checked, setChecked] = useState(true);
  const checked = listStateIndications[index].show

  const handleChangeValue = async () => {
    listStateIndications[index].show = !listStateIndications[index].show
    const listStateFilter: Array<number> = []
    listStateIndications.forEach(stateIndication =>
      stateIndication.show ? listStateFilter.push(stateIndication.id) : ''
    )
    // console.log(listStateFilter)

    const list = await dispatch(getListPatient({
      ...listPatient,
      status: [...listStateFilter],
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      status: [...listStateFilter],
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      status: [...listStateFilter],
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    // setChecked(!checked)
    checkClick()
  }

  const handleCheckedClick = async () => {
    listStateIndications.forEach(stateIndication =>
      stateIndication.id !== id ?
        stateIndication.show = false :
        stateIndication.show = true)

    const list = await dispatch(getListPatient({
      ...listPatient,
      status: [id],
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      status: [id],
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      status: [id],
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    checkClick()
  }

  // useEffect(() => {
  //   setChecked(listStateIndications[id].show)
  //   return () => { }
  // })

  return (
    <div className="state-item-container">
      <span>
        <Checkbox
          className='checkbox-orange'
          checked={checked}
          onChange={handleChangeValue}
        />
        <span className="state-item-label" onClick={handleCheckedClick}>
          {label}
        </span>
      </span>
      <span className="quantity">({countState[index].count})</span>
    </div>
  );
};

export default StateItem;
