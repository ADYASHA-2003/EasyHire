import axios from 'axios'

class ApplicantApiService{
    constructor(){
        this.api = String(import.meta.env.VITE_BACKEND_API)
    }

    async addApplicant(applicant){
        try{
            const res = await axios.post(`${this.api}/applicant/signup`,applicant)
            console.log(res.data);
            return {data: res.data, status: true}
        }catch(error){
            console.log(error);
            return {status: false, message: error?.response?.data?.message}
        }
    }

    async loginApplicant(applicant){
        try{
            const res = await axios.post(`${this.api}/applicant/signin`,applicant)
            console.log(res.data);
            return {data: res.data, status: true}
        }catch(error){
            console.log(error);
            return {status: false, message: error?.response?.data?.message}
        }
    }
}

const applicantApiService = new ApplicantApiService()
export default applicantApiService