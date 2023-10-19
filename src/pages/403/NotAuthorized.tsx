import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import Translate from '../../components/base/translate/Translate'
import path from '../../mocks/Path.json'

type Props = {}

const NotAuthorized = (_props: Props) => {
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle={<Translate contentKey="403" />}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(path.login.url)
          }}
        >
          <Translate contentKey="back" />
        </Button>
      }
    />
  )
}

export default NotAuthorized
