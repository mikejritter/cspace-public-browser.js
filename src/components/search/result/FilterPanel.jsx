/* global window */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import FilterList from './FilterList';
import config from '../../../config';
import styles from '../../../../styles/cspace/FilterPanel.css';
import cssDimensions from '../../../../styles/dimensions.css';

const propTypes = {
  api: PropTypes.func,
  isExpanded: PropTypes.bool,
  isPending: PropTypes.bool,
  result: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  api: () => undefined,
  isExpanded: false,
  isPending: false,
  result: Immutable.Map(),
};

const messages = defineMessages({
  title: {
    id: 'FilterPanel.title',
    defaultMessage: 'Refine results:',
  },
});

const {
  filterPanelCutoffWidth: cssFilterPanelCutoffWidth,
} = cssDimensions;

const filterPanelCutoffWidth = parseInt(cssFilterPanelCutoffWidth, 10);

export default function FilterPanel({ isExpanded, isPending, result }) {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      const { innerHeight } = window;
      const rect = panelRef.current.getBoundingClientRect();
      const maxHeight = innerHeight - rect.top;
      setHeight(maxHeight);
    }
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  function renderContent() {
    const isVisible = (window.innerWidth > filterPanelCutoffWidth) || isExpanded;

    if (!isVisible || !result.get('total')) {
      return undefined;
    }

    return (
      <div>
        <header>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.title} />
        </header>

        <FilterList
          aggregations={result.get('aggregations')}
          config={config.get('filters')}
          isPending={isPending}
        />
      </div>
    );
  }

  const className = isExpanded ? styles.expanded : styles.collapsed;
  const inlineStyle = height ? { height } : undefined;

  return (
    <div
      className={className}
      ref={panelRef}
      style={inlineStyle}
    >
      {renderContent()}
    </div>
  );
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
