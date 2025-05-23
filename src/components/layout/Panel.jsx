import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/cspace/Panel.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  title: PropTypes.element,
};

const defaultProps = {
  children: undefined,
  title: undefined,
};

export default function Panel({ children, title }) {
  const [expanded, setExpanded] = useState(true);

  function handleHeaderButtonClick() {
    setExpanded(!expanded);
  }

  const className = expanded ? styles.expanded : styles.collapsed;

  return (
    <div className={className}>
      <header>
        <button onClick={handleHeaderButtonClick} aria-expanded={expanded} type="button">{title}</button>
      </header>
      {expanded ? children : undefined}
    </div>
  );
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
