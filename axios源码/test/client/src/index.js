import axios from 'axios'

axios.get("http://localhost:3000/user").then((res) => {
  console.log(res)
})
console.log(axios)