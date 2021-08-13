import axios from 'axios';

const app_token = "VrgQgvOSk7wc8j8Ra4YkjUEGj"

const loginUser = async user => {
  try {
    const res = await axios.post(`/api/auth/login`, user)
    const { token } = res.data
    const finalUser = { ...res.data.user, token }
    localStorage.setItem('user', JSON.stringify(finalUser))
    return finalUser
  } catch (error) { console.log(error) }
}

const registerUser = async data => {
  try {
      const {  name, email, password } = data
    const res = await axios.post(`/api/auth/register`, {
      name,
      email,
      password,
    })
    const { token } = res.data;
    const finalUser = { ...res.data.user, token }
    return finalUser
  } catch (err) { console.log(err) }
}

 const setUserVoid = async () => {
    try {
        await axios.get(`/api/auth/logout`)
        localStorage.removeItem('user')
        return {}
    } catch (err) { console.log(err) }
}

const getTrees = async data => {
    try {
        data.$$app_token = app_token
        const trees = await axios.get(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json`, 
        { params: data })
        return trees
    } catch (err) { console.log(err) }
}

const labelFunc = async data => {
    try {
        const user = await axios.post(`/api/users`, data, 
        { headers : { authorization : data.token }})
        return user
    } catch (err) { console.log(err) }
}

const getNamedTrees = async token => {
    try {
        const namedTrees = await axios.get(`/api/users/named`, 
        { headers : { authorization : token }})
        return namedTrees
    } catch (err) { console.log(err) }
}

const setTypeSearch = data => data

export { 
  loginUser, 
  registerUser,
  setUserVoid,
  getTrees,
  labelFunc,
  getNamedTrees,
  setTypeSearch
 }
