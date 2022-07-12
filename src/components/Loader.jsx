import gif from '../assets/images/Spinner-1s-200px.gif'

export const Loader = () => {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={gif} alt="loading" />
      </div>
    </>
  )
}
