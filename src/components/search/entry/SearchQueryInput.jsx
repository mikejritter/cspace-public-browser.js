import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import SearchSubmitButton from './SearchSubmitButton';
import styles from '../../../../styles/cspace/SearchQueryInput.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  onCommit: PropTypes.func,
  showSubmitButton: PropTypes.bool,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  showSubmitButton: false,
  value: '',
};

export const messages = defineMessages({
  label: {
    id: 'searchQueryInput.label',
    defaultMessage: 'Search collection',
  },
  placeholder: {
    id: 'searchQueryInput.placeholder',
    defaultMessage: 'Search collection',
  },
  shortLabel: {
    id: 'searchQueryInput.shortLabel',
    defaultMessage: 'Search',
  },
});

export default function SearchQueryInput({
  id, onCommit, showSubmitButton, value,
}) {
  const intl = useIntl();

  function handleChange(event) {
    onCommit(id, event.target.value);
  }

  return (
    <div className={styles.common}>
      <input
        aria-label={intl.formatMessage(messages.label)}
        autoComplete="off"
        autoCorrect="off"
        name={id}
        placeholder={intl.formatMessage(messages.placeholder)}
        type="search"
        value={value}
        onChange={handleChange}
      />

      {showSubmitButton && <SearchSubmitButton />}
    </div>
  );
}

SearchQueryInput.propTypes = propTypes;
SearchQueryInput.defaultProps = defaultProps;
