const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

class Card {
  constructor() {
    this.state = 'init';
    this.column = 0;
    this.expertMode = false;
  }

  handleChar(_char) {
    const char = _char.toUpperCase();
    switch (char) {
      case ' ': {
        this.label(this.column, 0, char);
        break;
      }
      default: {
        try {
          this.punch(char);
          this.label(this.column, 0, char);
        } catch (e) {
          // unhandled char
          this.label(this.column, 0, '😂');
        }

        break;
      }
    }
  }

  label(col, row, key) {
    const $label = this.getCellNode(this.column, 0);
    $label.innerText = key;
  }

  punch(key) {
    const $cells = this.getPunchCells(key);
    [...$cells].forEach(n => n.classList.add('punch'));
  }

  unpunch(col) {
    [...$('table').rows].forEach(r => r.cells[col].classList.remove('punch'));
  }

  getPunchCells(key) {
    const code = this.getCode(key);
    const rows = this.getRows(code);
    const getCurrentColumnNodes = this.getCellNode.bind(null, this.column);
    const $cells = rows.map(getCurrentColumnNodes);
    return $cells
  }

  getCellNode(col, row) {
    return $('table').rows[row].cells[col];
  }


  getCode(key) {
    const code = {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',

      A: 'a1',
      B: 'a2',
      C: 'a3',
      D: 'a4',
      E: 'a5',
      F: 'a6',
      G: 'a7',
      H: 'a8',
      I: 'a9',

      J: 'b1',
      K: 'b2',
      L: 'b3',
      M: 'b4',
      N: 'b5',
      O: 'b6',
      P: 'b7',
      Q: 'b8',
      R: 'b9',

      S: '01',
      T: '02',
      U: '03',
      V: '04',
      W: '05',
      X: '06',
      Y: '07',
      Z: '08',


    };
    return code[key];
  }
  
  getRows(code) {
    const row = {
 // label: 0
      'a': 1, 
      'b': 2,
      '0': 3,
   // col: 4
      '1': 5,
      '2': 6,
      '3': 7,
      '4': 8,
      '5': 9,
      '6': 10,
      '7': 11,
      '8': 12,
      '9': 13
    };
    const rows = code.split('').map(c => row[c]);
    return rows;
  }

  next() {
    this.column = (this.column + 1);
    if (this.column >= 80) {
      this.clear();
    }
    document.querySelector('#column').innerText = JSON.stringify(this);
  }

  previous() {
    this.column = (this.column - 1);
    if (this.column <= 0) {
      this.clear();
    }
    document.querySelector('#column').innerText = JSON.stringify(this);
  }

  input(key) {
    switch (this.state) {
      case 'init':
        this.clear();
        this.state = 'input';
        break;
      default:
        // nothing
    } 
    switch (key) {
      case 'ArrowUp': 
      case 'ArrowDown': 
      case 'ArrowLeft': 
      case 'ArrowRight': 
      case 'Enter': 
      case 'Meta': 
      case 'Alt':
      case 'Control':
      case 'Escape':
      case 'Shift': {
        break;
      }
      case 'Backspace': {
        if (!this.expertMode) {
          this.previous();
          this.unpunch(this.column);
          this.label(this.column, 0, '');
        } else {
          this.clear();
        }
        break;

      }
      default: {
        this.handleChar(key);
        this.next();
        break;
      }
    }
  }

  clear() {
    this.column = 0;
    [...document.querySelectorAll('.punch')].forEach(n => n.classList.remove('punch'));
    [...$('table').rows[0].cells].forEach(c => (c.innerText = ''));
  }


}


const card = new Card();

function onKey(e) {
  e.preventDefault();
  const key = e.key;
  console.log(key, e);
  return card.input(key);
}


document.body.addEventListener('keydown', onKey);
