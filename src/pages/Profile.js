import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../helpers';
import Style from './css/Profile.module.css';


function Profile() {
  const user = getLocalStorage('user');
  const email = user ? user.email : '';
  const { push } = useHistory();

  return (
    <div className={ Style.container }>
      <Header title="Profile" />

      <p data-testid="profile-email" className={ Style.email }>{email}</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => push('/done-recipes') }
        className={ Style.button }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => push('/favorite-recipes') }
        className={ Style.button }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          push('/');
          localStorage.clear();
        } }
        className={ Style.button }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
