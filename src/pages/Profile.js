import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers';

function Profile() {
  const user = getLocalStorage('user');
  const { push } = useHistory();

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{user.email}</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => push('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => push('/favorite-recipes') }
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
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
