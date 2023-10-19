import { DownOutlined, HomeOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { IArea } from '../../models/reducers/folderNav.model';
import { getDataGlobal, setDataGlobal } from '../../utils';
import './Area.scss';
import Folder from './Folder';
import { ISearch } from '../../models/reducers/patients.model';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getCountByState, getListPatient, setListPatient } from '../../reducers/slice/listPatientSlice';
import { setListFilterPatient } from '../../reducers/slice/listFilterPatientSlice';
import { setCountByState } from '../../reducers/slice/countByStateSlice';

type Props = {
  checkClick(): void;
  area: IArea
}

const Area = ({ checkClick, area }: Props) => {
  const [showTree, setShowTree] = useState(true)
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    setShowTree(!showTree)
  }

  const handleCheckedClick = async () => {
    const newArrayID = []
    for (let i = 0; i < area.folder.length; i++) {
      for (let j = 0; j < area.folder[i].modalitys.length; j++) {
        newArrayID.push(area.folder[i].modalitys[j].id)
      }
    }
    setDataGlobal({ arrayID: newArrayID })
    console.log(getDataGlobal().arrayID)
    checkClick()

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
    <div className='container-area'>
      <div className='row-area'>
        <span className='btn-area' onClick={handleClick}>
          {showTree ? <DownOutlined /> : <RightOutlined />}
        </span>

        <HomeOutlined className='home-icon' />

        <span className='text-area' onClick={handleCheckedClick}>
          {area?.name}
        </span>
      </div>

      {showTree && area?.folder.map((folder, index) => (
        <Folder checkClick={checkClick} folder={folder} key={index} />
      ))}
    </div>
  );
}

export default Area;
