import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { baseURL, tooltipPositions } from '../helpers';
import shareIcon from '../images/shareIcon.svg';
import Style from './css/ShareBTN.module.css';

const magicNumber1000 = 100000;

function ShareBTN({ recipeType, dataTestid, idCard, tooltipPosition }) {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const basePage = pathname.split('/')[1];
  const target = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const handleFavoritButton = () => {
    const aux = recipeType || basePage;
    const auxId = idCard === '' ? id : idCard;
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
        placement={ tooltipPosition }
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
  tooltipPosition: PropTypes.string,
};

ShareBTN.defaultProps = {
  recipeType: null,
  dataTestid: null,
  idCard: '',
  tooltipPosition: tooltipPositions.right,
};

export default ShareBTN;
