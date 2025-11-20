export const ErrorMessage = ({error, onRetry, isFetching}: {error: string | null, onRetry: () => void, isFetching: boolean}) => {
  return <div role="alert" style={{ padding: "16px", textAlign: "center" }}>
    <div>{error}</div>
    <button onClick={onRetry} style={{ marginTop: "8px" }} disabled={isFetching}>
      Retry
    </button>
  </div>
}