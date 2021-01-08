export default async function fetchEntry(endpoint, data){
  var res = await fetch('http://spaceballcookie.hopto.org:3000/api/' + endpoint, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res.json();
}