const getPosts = () => {
  return fetch(`http://jsonplaceholder.typicode.com/posts`) /* <--- Put URL of Website in here*/
  .then(res => res.json())
  .then(posts => console.log(posts))
}
