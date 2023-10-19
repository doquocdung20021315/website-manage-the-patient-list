import { RootState, useAppSelector } from '../../../redux/store'
import LoadingBar from 'react-top-loading-bar'
type Props = {}

const LoadingTopBar = (_props: Props) => {
  const loadingBar = useAppSelector((store: RootState) => store.loadingBar)
  return loadingBar.show ? <LoadingBar color={'#f11946'} progress={70} /> : null
}

export default LoadingTopBar
