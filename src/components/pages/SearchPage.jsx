/* global window */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import Immutable from 'immutable';
import bodyClassName from '../../helpers/bodyClassName';
import Fixed from '../layout/Fixed';
import FilterPanel from '../search/result/FilterPanelContainer';
import SearchEntryPanel from '../search/entry/SearchEntryPanel';
import SearchResultPanel from '../search/result/SearchResultPanelContainer';
import ScrollTopButton from '../layout/ScrollTopButton';
import ToggleFilterPanelButton from '../layout/ToggleFilterPanelButton';
import { FILTER_PANEL_ID } from '../../constants/ids';
import styles from '../../../styles/cspace/SearchPage.css';

const propTypes = {
  isFilterPanelExpanded: PropTypes.bool,
  onLocationChange: PropTypes.func,
  onTogglePanelButtonClick: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  isFilterPanelExpanded: false,
  onLocationChange: () => undefined,
  onTogglePanelButtonClick: () => undefined,
  params: undefined,
};

const messages = defineMessages({
  title: {
    id: 'SearchPage.title',
    defaultMessage: 'Search',
  },
});

export default function SearchPage({
  onLocationChange, params, isFilterPanelExpanded, onTogglePanelButtonClick,
}) {
  const intl = useIntl();
  const location = useLocation();

  useEffect(() => {
    window.document.body.classList.add(bodyClassName(styles.common));

    if (window.scrollTo) {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    }

    onLocationChange(location);
    return (() => window.document.body.classList.remove(bodyClassName(styles.common)));
  }, [location]);

  // todo: push into FilterPanel?
  function handleToggleFilterPanelButtonClick() {
    onTogglePanelButtonClick(FILTER_PANEL_ID);
  }

  if (!params) {
    return null;
  }

  const title = intl.formatMessage(messages.title);

  return (
    <div className={styles.common}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Fixed>
        <SearchEntryPanel />

        <ToggleFilterPanelButton
          isFilterPanelExpanded={isFilterPanelExpanded}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={handleToggleFilterPanelButtonClick}
        />

        <FilterPanel
          // eslint-disable-next-line react/jsx-no-bind
          isExpanded={isFilterPanelExpanded}
        />
      </Fixed>

      <SearchResultPanel
        params={params}
      />

      <ScrollTopButton />
    </div>
  );
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;
