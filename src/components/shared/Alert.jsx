import { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import { FaBan, FaExclamation } from 'react-icons/fa';

const Alert = () => {
  const {alert} = useContext(AlertContext)
  return (
    alert !== null && (
      <p className='flex items-start mb-4 space-x-2'>
        {(() => {
          switch(alert.type) {
            case 'error':
              return <FaBan size={30} color={'#f07167'} />;
            case 'warning':
              return <FaExclamation size={30} color={'#fed9b7'} />;
            default:
              return null
          }
        })()}
        <p className='flex-1 text-base font-semibold leading-7 text-white'>
          <strong>{alert.msg}</strong>
        </p>
      </p>
    )
  );
}
export default Alert