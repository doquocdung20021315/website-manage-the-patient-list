import { ICountByState } from '../../models/reducers/patients.model'
import { RootState, useAppSelector } from '../../redux/store'
import './SiderItem.scss'

type Props = {
  clickItem(): void
  text: string
}

const SiderItem = ({clickItem, text}: Props) => {
  const countByState: Array<ICountByState> = useAppSelector((state: RootState) => state.countByState)
  const countSum = countByState.reduce((total, current) => {
    return total + current.count
  }, 0)

  return (
    <div className='sider-item-container' onClick={clickItem}>
      <span className="sider-item">{text}</span>
      {text === "FILTER" ? <span className='sider-item'>({countSum})</span> : ""}
    </div>
  );
}

export default SiderItem;
