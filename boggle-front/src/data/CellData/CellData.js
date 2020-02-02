export default class CellData {
    constructor(letter, rowId, columnId, selected = false, hint = false) {
      this.letter = letter;
      this.row = rowId;
      this.column = columnId;
      this.selected = selected;
      this.hint = hint;
    }
  
    clone() {
      return new CellData(this.letter, this.row, this.column, this.selected, this.hint);
    }
  }
  