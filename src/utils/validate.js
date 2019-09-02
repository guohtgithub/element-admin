export function isvalidUsername(str){
  const valid_map = ['1@example.com','editor']
  return valid_map.indexOf(str.trim()) >= 0
}