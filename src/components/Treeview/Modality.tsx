import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { IModality } from '../../models/reducers/folderNav.model';
import { ISearch } from '../../models/reducers/patients.model';
import { getCountByState, getListPatient, setListPatient } from '../../reducers/slice/listPatientSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getDataGlobal, setDataGlobal } from '../../utils';
import './Modality.scss';
import { setListFilterPatient } from '../../reducers/slice/listFilterPatientSlice';
import { setCountByState } from '../../reducers/slice/countByStateSlice';

type Props = {
  checkClick(): void;
  modality: IModality
}

const Modality = ({ checkClick, modality }: Props) => {
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { arrayID } = getDataGlobal();
    if (!arrayID.includes(modality.id)) {
      arrayID.push(modality.id)
      setDataGlobal({ arrayID })

      dispatch(setListPatient({
        ...listPatient,
        servers: [...arrayID]
      }))
    }
    return () => { }
  }, [])

  const [checked, setChecked] = useState(true);

  const handleChangeValue = async (value: any) => {
    const { arrayID } = getDataGlobal();
    if (value.target.checked) {
      if (!arrayID.includes(modality.id)) {
        arrayID.push(modality.id)
        setDataGlobal({ arrayID })

        const list = await dispatch(getListPatient({
          ...listPatient,
          servers: [...arrayID],
          pageIndex: 1
        }))
        const countByState = await dispatch(getCountByState({
          ...listPatient,
          servers: [...arrayID],
          pageIndex: 1
        }))
        dispatch(setListPatient({
          ...listPatient,
          servers: [...arrayID],
          pageIndex: 1
        }))
        dispatch(setListFilterPatient(list.payload))
        dispatch(setCountByState(countByState.payload))
      }
    } else {
      const newArrayID = arrayID.filter(id => id !== modality.id)
      setDataGlobal({ arrayID: newArrayID })

      const list = await dispatch(getListPatient({
        ...listPatient,
        servers: [...newArrayID],
        pageIndex: 1
      }))
      const countByState = await dispatch(getCountByState({
        ...listPatient,
        servers: [...newArrayID],
        pageIndex: 1
      }))
      dispatch(setListPatient({
        ...listPatient,
        servers: [...newArrayID],
        pageIndex: 1
      }))
      dispatch(setListFilterPatient(list.payload))
      dispatch(setCountByState(countByState.payload))
    }
    console.log(getDataGlobal().arrayID)
    setChecked(!checked)
  }

  useEffect(() => {
    const { arrayID } = getDataGlobal();
    if (!arrayID.includes(modality.id)) {
      setChecked(false)
    } else {
      setChecked(true)
    }
    return () => { }
  })

  const handleCheckedClick = async () => {
    const newArrayID = []
    newArrayID.push(modality.id)
    setDataGlobal({ arrayID: newArrayID })
    console.log(getDataGlobal().arrayID)

    const list = await dispatch(getListPatient({
      ...listPatient,
      servers: [...newArrayID],
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      servers: [...newArrayID],
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      servers: [...newArrayID],
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    checkClick()
  }

  return (
    <div className='container-modal'>
      <Checkbox
        className='checkbox-orange'
        checked={checked}
        onChange={handleChangeValue}
      />
      <span className='text-modal' onClick={handleCheckedClick}>
        {modality.name}
      </span>
    </div>
  );
}

export default Modality;
