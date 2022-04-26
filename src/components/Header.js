import React from 'react';

function Header() {
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        Profile
      </button>
      <h3 data-testid="page-title">Page Title</h3>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        Search
      </button>
    </div>
  );
}

export default Header;
