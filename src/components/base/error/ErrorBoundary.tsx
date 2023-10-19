import { Component } from 'react'

type Props = {
  children?: any
}

type State = {
  error: any
  errorInfo: any
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }
  render() {
    console.log(this.state.errorInfo)
    const { error, errorInfo } = this.state
    if (errorInfo) {
      const errorDetails = (
        <details className="preserve-space">
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      )
      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
