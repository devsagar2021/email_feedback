import { useNavigate } from 'react-router-dom';
import appAxios from '../config/appAxios';
import { LOGOUT } from '../reducers/auth';
import { useAppDispatch } from './useTypedAppHooks';

const useAxiosInterceptor = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  appAxios.interceptors.response.use(
    res => res,
    error => {
      console.log(error);
      if (error.response.status === 401) {
        console.log('Unauthorized');
        dispatch({ type: LOGOUT });
        navigate('/');
      }
      return Promise.reject(error);
    }
  );
}

export default useAxiosInterceptor;
