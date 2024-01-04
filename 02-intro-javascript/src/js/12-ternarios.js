const isActive = false;
const msg = isActive ? 'Active' : 'Inactive';
const error = (isActive===false) && 'Go to the admin site'

console.log({
  msg: msg, 
  error: error,
});