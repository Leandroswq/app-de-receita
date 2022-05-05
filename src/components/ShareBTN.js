import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Overlay, Tooltip } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import { baseURL } from '../helpers';
import Style from './css/ShareBTN.module.css';

const magicNumber1000 = 1000;

function ShareBTN() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const basePage = pathname.split('/')[1];
  const target = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const handleFavoritButton = () => {
    navigator.clipboard.writeText(`${baseURL}/${basePage}/${id}`);
    setShowMessage((p) => !p);
    setTimeout(() => {
      setShowMessage(false);
    }, magicNumber1000);
  };

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleFavoritButton }
        ref={ target }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <Overlay
        target={ target.current }
        show={ showMessage }
        placement="right"
      >
        {(props) => (
          <Tooltip id="overlay-example" { ...props }>
            <div className={ Style.tooltip }>Link copied!</div>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default ShareBTN;
