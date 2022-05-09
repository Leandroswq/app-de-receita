import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { baseURL } from '../helpers';
import shareIcon from '../images/shareIcon.svg';
import Style from './css/ShareBTN.module.css';

const magicNumber1000 = 1000;

function ShareBTN({ recipeType, dataTestid, idCard }) {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const basePage = pathname.split('/')[1];
  const target = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const handleFavoritButton = () => {
    const aux = recipeType || basePage;
    const auxId = idCard || id;
    navigator.clipboard.writeText(`${baseURL}/${aux}/${auxId}`);
    setShowMessage((p) => !p);
    setTimeout(() => {
      setShowMessage(false);
    }, magicNumber1000);
  };
  return (
    <>
      <button
        type="button"
        data-testid={
          dataTestid || 'share-btn'
        }
        onClick={ handleFavoritButton }
        ref={ target }
        src={ shareIcon }
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

ShareBTN.propTypes = {
  recipeType: PropTypes.string,
  dataTestid: PropTypes.string,
  idCard: PropTypes.string,
};

ShareBTN.defaultProps = {
  recipeType: null,
  dataTestid: null,
  idCard: PropTypes.string,
};

export default ShareBTN;
