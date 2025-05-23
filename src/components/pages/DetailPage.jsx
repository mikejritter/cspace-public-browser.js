/* global window */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useLocation, useParams } from 'react-router';
import bodyClassName from '../../helpers/bodyClassName';
import ScrollTopButton from '../layout/ScrollTopButton';
import DetailPanel from '../detail/DetailPanelContainer';
import styles from '../../../styles/cspace/DetailPage.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map),
  onLeave: PropTypes.func,
  onLocationChange: PropTypes.func,
};

const defaultProps = {
  onLeave: () => undefined,
  onLocationChange: () => undefined,
  params: undefined,
};

export default function DetailPage({
  params, onLeave, onLocationChange,
}) {
  const location = useLocation();
  const { csid } = useParams();

  useEffect(() => {
    window.document.body.classList.add(bodyClassName(styles.common));

    if (window.scrollTo) {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    }

    onLocationChange(location, csid);
    return (() => window.document.body.classList.remove(bodyClassName(styles.common)));
  }, [location]);

  useEffect(() => (() => onLeave()), []);

  if (!params) {
    return null;
  }

  return (
    <div className={styles.common}>
      <DetailPanel params={params} />
      <ScrollTopButton />
    </div>
  );
}

DetailPage.propTypes = propTypes;
DetailPage.defaultProps = defaultProps;
