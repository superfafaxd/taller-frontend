var table = document.getElementById("tablaUSERS"), rIndex;
//table.addEventListener('click', event => {


  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      rIndex = this.rowIndex;
      console.log(rIndex);
      console.log(this.cells[0].innerHTML)
      console.log(this.cells[1].innerHTML)
      console.log(this.cells[2].innerHTML)

    };
  }


