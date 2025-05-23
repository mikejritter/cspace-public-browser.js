import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useHistory } from 'react-router';
import SearchQueryInput from './SearchQueryInput';
import { SEARCH_QUERY_ID } from '../../../constants/ids';
import styles from '../../../../styles/cspace/SearchEntryForm.css';

const propTypes = {
  onCommit: PropTypes.func,
  onSubmit: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  onCommit: () => undefined,
  onSubmit: () => undefined,
  params: Immutable.Map(),
};

export default function SearchEntryForm({ onCommit, onSubmit, params }) {
  const ref = useRef(null);
  const history = useHistory();

  function handleInputCommit(id, value) {
    onCommit(id, value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(history);
  }

  return (
    <form
      className={styles.common}
      ref={ref}
      role="search"
      onSubmit={handleSubmit}
    >
      <SearchQueryInput
        id={SEARCH_QUERY_ID}
        showSubmitButton
        value={params.get(SEARCH_QUERY_ID)}
        // eslint-disable-next-line react/jsx-no-bind
        onCommit={handleInputCommit}
      />
    </form>
  );
}

SearchEntryForm.propTypes = propTypes;
SearchEntryForm.defaultProps = defaultProps;
