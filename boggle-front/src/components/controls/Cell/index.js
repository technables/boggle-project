import React from 'react';

import './Cell.css';

const Cell = props => {
    const {
        hint,
        selected,
        letter,
        handleclick,
        extraClass
    } = props;

    let cellClass = '';
    if (extraClass)
        cellClass += extraClass;

    if (hint && !selected) {
        cellClass += ' hint ';
    }

    return (
        <button 
        className = { selected ? `cell cell-selected ${cellClass}`: `cell ${cellClass}`}
        onClick={handleclick}
        >
            {letter}
        </button>
    );
};

export default Cell;