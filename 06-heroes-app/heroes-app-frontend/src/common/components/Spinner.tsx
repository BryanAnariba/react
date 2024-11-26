interface SpinnerProps {
  message: string;
}

export const Spinner = ({ message }: SpinnerProps): JSX.Element => {
  return (
    <div className="alert alert-primary" role="alert">
      <div className="d-flex inline-flex justify-content-center text-center align-items-center gap-2">
        <div className="spinner-border" role="status"></div>
        <div className="mr-2">{message}</div>
      </div>
    </div>
  )
}
