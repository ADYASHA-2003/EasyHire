import axios from 'axios'

class RecruiterApiService{
    constructor(){
        this.api = String(import.meta.env.VITE_BACKEND_API)
    }

    async addRecruiter(recruiter){
        try{
            const res = await axios.post(`${this.api}/recruiter/signup`,recruiter)
            console.log(res.data);
            return {data: res.data, status: true}
        }catch(error){
            console.log(error);
            return {status: false, message: error?.response?.data?.message}
        }
    }

    async loginRecruiter(recruiter){
        try{
            const res = await axios.post(`${this.api}/recruiter/signin`,recruiter)
            console.log(res.data);
            return {data: res.data, status: true}
        }catch(error){
            console.log(error);
            return {status: false, message: error?.response?.data?.message}
        }
    }
}

const recruiterApiService = new RecruiterApiService()
export default recruiterApiService