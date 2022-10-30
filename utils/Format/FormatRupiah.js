export default function FormatRupiah(number) {
  // format : number dijadikan string lalu string tersebut dijadikan substring
  const format = number.toString().split('').reverse().join('');
  const convert = format.match(/\d{1,3}/g);
  const rp = convert.join('.').split('').reverse().join('');
  return rp ;
}
