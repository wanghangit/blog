import axios from '../axios'

axios.get('http://localhost:3000/getUserInfo').then((res) => {
  console.log(res)
},(reason) => {
  console.log(reason)
})
