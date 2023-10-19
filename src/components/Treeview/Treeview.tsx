import { HomeOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useState } from 'react'
import { IArea } from '../../models/reducers/folderNav.model'
import Area from './Area'
import './Treeview.scss'
import { getDataGlobal, setDataGlobal } from '../../utils'
import { ISearch } from '../../models/reducers/patients.model'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { getCountByState, getListPatient, setListPatient } from '../../reducers/slice/listPatientSlice'
import { setListFilterPatient } from '../../reducers/slice/listFilterPatientSlice'
import { setCountByState } from '../../reducers/slice/countByStateSlice'

type Props = {
  folderNav: Array<IArea>
}

const Treeview = ({ folderNav }: Props) => {
  // console.log(folderNav)
  const [check, setCheck] = useState(true)
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)
  const dispatch = useAppDispatch()

  const handleCheckClick = () => {
    setCheck(!check)
  }

  const handleAllClick = async () => {
    const newArrayID = []
    for (let k = 0; k < folderNav.length; k++) {
      for (let i = 0; i < folderNav[k].folder.length; i++) {
        for (let j = 0; j < folderNav[k].folder[i].modalitys.length; j++) {
          newArrayID.push(folderNav[k].folder[i].modalitys[j].id)
        }
      }
    }
    setDataGlobal({ arrayID: newArrayID })
    console.log(getDataGlobal().arrayID)
    setCheck(!check)

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

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <div className='all'>
        <HomeOutlined className='icon-home' onClick={handleAllClick} />
        <span className='text-all' onClick={handleAllClick}>ALL</span>
        <Input className='text-input-all' placeholder="Modality" />;
      </div>
      {folderNav.map((area, index) => (
        <Area checkClick={handleCheckClick} area={area} key={index} />
      ))}
    </div>
  )
}

export default Treeview
