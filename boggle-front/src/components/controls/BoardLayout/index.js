import React from 'react';
import Cell from '../Cell';
import './board.css'

const BoardLayout = props =>{
    const {board, handleclick} = props;

    return (
        <div className="board-wrapper row">
            <div class="board-area">
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
            <div class="board-hint">
                
                <div class="hint-row">
                    <Cell letter="S" key="hint" selected="true" hint="false"/>
                    <span className="hint-title"> : selected cell</span>
                </div>
                <div class="hint-row">
                    <Cell letter="H" key="hint" selected="" hint="true"/>
                    <span className="hint-title"> : available cell</span>
                </div>
            </div>
        </div>
    );
};

export default BoardLayout;