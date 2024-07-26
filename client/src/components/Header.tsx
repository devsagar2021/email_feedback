import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useTypedAppHooks';

const Header = () => {
  const { loading, user } = useAppSelector((state) => state.auth);

  return (
    <nav className="nav-wrapper">
      <Link to={user ? '/surveys' : '/'} className="left brand-logo">
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
