export default async function fetchEntry(endpoint, data){
  const url = 'http://redditbets.zapto.org:3000/api/';
  //const url = 'http://spaceballcookie.hopto.org/api/';
  var res = await fetch(url + endpoint, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res.json();
}