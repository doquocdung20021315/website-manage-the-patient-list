import { Input } from 'antd';
import './Info.scss';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { ISearch } from '../../models/reducers/patients.model';
import { getCountByState, getListPatient, setListPatient } from '../../reducers/slice/listPatientSlice';
import { setListFilterPatient } from '../../reducers/slice/listFilterPatientSlice';
import { setCountByState } from '../../reducers/slice/countByStateSlice';

type Props = {}

const Info = ({ }: Props) => {
  const dispatch = useAppDispatch()
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)

  const handleEnterDoctor = async (e: any) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      assDoctor: e.target.value,
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      assDoctor: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      assDoctor: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Doctor: ', e.target.value)
  }

  const handleEnterIndication = async (e: any) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      indication: e.target.value,
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      indication: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      indication: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Indication: ', e.target.value)
  }

  const handleEnterBodyPart = async (e: any) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      bodypart: e.target.value,
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      bodypart: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      bodypart: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('BodyPart: ', e.target.value)
  }

  const handleEnterConclusion = async (e: any) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      conclusions: e.target.value,
      pageIndex: 1
    }))
    const countByState = await dispatch(getCountByState({
      ...listPatient,
      conclusions: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListPatient({
      ...listPatient,
      conclusions: e.target.value,
      pageIndex: 1
    }))
    dispatch(setListFilterPatient(list.payload))
    dispatch(setCountByState(countByState.payload))

    console.log('Conclusion: ', e.target.value)
  }

  return (
    <div className='info-container'>
      <Input
        className='info-text-input'
        placeholder="Reference Doctor"
        onPressEnter={handleEnterDoctor}
      />
      <Input
        className='info-text-input'
        placeholder="Indication"
        onPressEnter={handleEnterIndication}
      />
      <Input
        className='info-text-input'
        placeholder="BodyPart"
        onPressEnter={handleEnterBodyPart}
      />
      <Input
        className='info-text-input'
        placeholder="Conclusion"
        onPressEnter={handleEnterConclusion}
      />
    </div>
  );
};

export default Info;
