import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import Translate from '../../components/base/translate/Translate'
import path from '../../mocks/Path.json'
type Props = {}

const NotFound = (_props: Props) => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle={<Translate contentKey="404" />}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(path.home.url)
          }}
        >
          <Translate contentKey="back" />
        </Button>
      }
    />
  )
}

export default NotFound
