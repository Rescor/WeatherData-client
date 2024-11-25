import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return <div style={{ display: 'flex', justifyContent: 'center', margin: '70px' }}>
    <CircularProgress />
  </div>
}
