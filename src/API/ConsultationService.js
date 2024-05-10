import axios from 'axios'

export class ConsultationService {
    static async Create() {

    }

    static async GetAll() {
        var response = await axios.get("http://localhost:8080/private/consultations", {
            // params:{
            //     page: page,
            //     limit: consOnPage,
            // },
            withCredentials:true, 
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200 && response.data) {
            return JSON.parse(response.data)
        }
    }

    static async Update() {
        
    }

    static Delete() {
        
    }
}