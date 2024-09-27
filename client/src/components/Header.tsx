import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedAppHooks';
import { fetchUser } from '../actions';

const Header = () => {
  const { loading, user, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (authenticated) {
      navigate('/surveys');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <nav className="nav-wrapper">
      <Link to={authenticated ? '/surveys' : '/'} className="left brand-logo">
        Email Feedback
      </Link>
      <ul id="nav-mobile" className="right">
        {loading && <li>Loading...</li>}
        {!loading && (
          !user
            ? <li><a href="/auth/google">Login with google</a></li>
            : (
              <>
                <li style={{ padding: '0 15px 0 15px'}}>
                  <img src={user.displayPicURL} alt={'pic'} style={{width: '25px', borderRadius: '50%', marginRight: '5px', verticalAlign: 'middle'}} />
                  <span>{user.displayName}</span>
                  <span>{`: ${user.credits ?? 0}`}</span>
                </li>
                <li><Link to='/add-credits' className='btn-flat grey-text text-lighten-2'>Add credits</Link></li>
                <li><a href='/api/logout'>Logout</a></li>
              </>
            )
          )
        }
      </ul>
    </nav>
  );
}

export default Header;
