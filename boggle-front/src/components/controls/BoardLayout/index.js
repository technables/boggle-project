import React from 'react';
import Cell from '../Cell';

const BoardLayout = props =>{
    const {board, handleclick} = props;

    return (
        <div className="board-area">
            {board.map((data,index)=>{
                return (
                    <div className="row-item" key={index}>
                        {data.map(cell=>{
                            return (
                                <Cell 
                                    extraClass={`cell-${board.length}`}
                                    hint = {cell.hint}
                                    selected = {cell.selected}
                                    letter={cell.letter}
                                    key = {cell.row +cell.column}
                                    handleclick ={ handleclick.bind(
                                        this,
                                        cell.row,
                                        cell.column
                                    )}
                                />
                            );
                        })}
                        </div>
                );
            })}
        </div>
    );
};

export default BoardLayout;