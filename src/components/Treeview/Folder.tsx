import { DownOutlined, FolderFilled, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { IFolder } from '../../models/reducers/folderNav.model';
import { getDataGlobal, setDataGlobal } from '../../utils';
import './Folder.scss';
import Modality from './Modality';
import { ISearch } from '../../models/reducers/patients.model';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getCountByState, getListPatient, setListPatient } from '../../reducers/slice/listPatientSlice';
import { setListFilterPatient } from '../../reducers/slice/listFilterPatientSlice';
import { setCountByState } from '../../reducers/slice/countByStateSlice';

type Props = {
  checkClick(): void;
  folder: IFolder
}

const Folder = ({checkClick, folder }: Props) => {
  const [showTree, setShowTree] = useState(true)
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    setShowTree(!showTree)
  }

  const handleCheckedClick = async () => {
    const newArrayID = []
    for (let i = 0; i < folder.modalitys.length; i++) {
      newArrayID.push(folder.modalitys[i].id)
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
    <div className='container-folder'>
      <div className='row-folder'>
        <span className='btn-folder' onClick={handleClick}>
          {showTree ? <DownOutlined /> : <RightOutlined />}
        </span>

        <FolderFilled className='folder-icon' />

        <span className='text-folder' onClick={handleCheckedClick}>
          {folder.name}
        </span>
      </div>
      {showTree && folder?.modalitys.map((modality, index) => (
        <Modality checkClick={checkClick} modality={modality} key={index} />
      ))}
    </div>
  );
}

export default Folder;
