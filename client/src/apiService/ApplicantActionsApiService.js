import axios  from "axios";
import {getToken} from '../utils/helperFunctions'

class ApplicantActionsApiService{
    constructor(){
        this.api = String(import.meta.env.VITE_BACKEND_API)
    }

    async getAllJobPosts(){
        try{
            const res = await axios.get(`${this.api}/jobBoard`)
            console.log(res.data);
            return {data:res.data, status:true}
        }
        catch(error){
            console.log(error);
            return {status:false}
        }
    }
}
const applicantActionsApiService = new ApplicantActionsApiService()
export default applicantActionsApiService