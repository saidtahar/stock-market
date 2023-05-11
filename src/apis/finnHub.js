import axios from "axios"

const TOKEN = "cgqomh1r01qn6i39kcp0cgqomh1r01qn6i39kcpg"

export default axios.create({
    baseURL:"https://finnhub.io/api/v1" ,
    params:{
        token:TOKEN
    }
})