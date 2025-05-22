import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import styles from '../../../../styles/cspace/FilterSearchInput.css';

const propTypes = {
  onCommit: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  value: '',
};

const messages = defineMessages({
  label: {
    id: 'filterSearchInput.label',
    defaultMessage: 'Search',
  },
});

export default function FilterSearchInput({ onCommit, value }) {
  const intl = useIntl();

  function handleChange(event) {
    onCommit(event.target.value);
  }

  const label = intl.formatMessage(messages.label);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      {label}

      <input
        className={styles.common}
        type="search"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}

FilterSearchInput.propTypes = propTypes;
FilterSearchInput.defaultProps = defaultProps;
