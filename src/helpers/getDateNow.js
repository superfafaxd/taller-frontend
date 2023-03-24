
export const getDateNow = () => {

    
// crea un nuevo objeto `Date`
var date = new Date();
var d = date.getDate();
var m = date.getMonth() + 1; //Month from 0 to 11
var y = date.getFullYear();
let dateNow = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

  return {
    dateNow
  }
}
