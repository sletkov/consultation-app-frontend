export class ConsultationService {
    static async Create() {

    }

    static async GetAll() {
        const response = await fetch("http://localhost:8080/consultations", {})

        const createResponse = await fetch('http://localhost:8080/sign-up', {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
              },
              body: body
        }).then((response)=>{
            return response.json
        })
    }

    static async Update() {
        
    }

    static Delete() {
        
    }
}