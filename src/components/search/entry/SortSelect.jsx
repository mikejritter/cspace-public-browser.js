import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';
import config from '../../../config';
import styles from '../../../../styles/cspace/SortSelect.css';

const propTypes = {
  onCommit: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  value: config.get('defaultSortOrder'),
};

const messages = defineMessages({
  label: {
    id: 'sortSelect.label',
    defaultMessage: 'Sort results by',
  },
  bestmatch: {
    id: 'sortSelect.bestmatch',
    defaultMessage: 'Best match',
  },
  atoz: {
    id: 'sortSelect.atoz',
    defaultMessage: 'A to Z',
  },
  ztoa: {
    id: 'sortSelect.ztoa',
    defaultMessage: 'Z to A',
  },
  newest: {
    id: 'sortSelect.newest',
    defaultMessage: 'Newest',
  },
  oldest: {
    id: 'sortSelect.oldest',
    defaultMessage: 'Oldest',
  },
});

export default function SortSelect({ onCommit, value }) {
  const intl = useIntl();
  const history = useHistory();

  function handleChange(event) {
    onCommit(history, event.target.value);
  }

  return (
    <label
      htmlFor="sort-select"
    >
      Sort by
      {' '}
      <select
        className={styles.common}
        id="sort-select"
        value={value}
        onChange={handleChange}
      >
        {
            ['bestmatch', 'atoz', 'ztoa', 'newest', 'oldest'].map((sortOrder) => (
              <option
                key={sortOrder}
                value={sortOrder}
              >
                {intl.formatMessage(messages[sortOrder])}
              </option>
            ))
          }
      </select>
    </label>
  );
}

SortSelect.propTypes = propTypes;
SortSelect.defaultProps = defaultProps;
