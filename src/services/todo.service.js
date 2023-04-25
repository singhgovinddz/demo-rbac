
class TodoService {
    static token = null;
    apiOrigin = null;
    constructor (apiOrigin) { 
        this.apiOrigin  = apiOrigin;
    }

    async create(payload) {
        try {
            const response = await fetch(`${this.apiOrigin}/api/todos`, {
                method: 'post',  
                headers: {
                  Authorization: `Bearer ${TodoService.token}`,
                  "Content-Type": 'application/json'
                },
                body: JSON.stringify(payload)
              });
            if (response.status === 200) {
                return response.json();
            } else {
                throw await response.json()
            }
        }catch(e) {
            throw e;
        }
        
    }

    async update(payload) {
        try {
        const response = await fetch(`${this.apiOrigin}/api/todos`, {
            method: 'put',  
            headers: {
              Authorization: `Bearer ${TodoService.token}`,
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
          });
          if(response.status === 200) {
            return response.json();
        } else {
            throw await response.json()
        }
        } catch (e) {
            throw e
        }
    }

    async delete(id) {
        try {
        const response = await fetch(`${this.apiOrigin}/api/todos/${id}`, {
            method: 'delete',  
            headers: {
              Authorization: `Bearer ${TodoService.token}`,
            }
          });
          if(response.status === 200) {
            return response.json();
        } else {
            throw await response.json()
        }
        } catch (e) {
            throw e;
        }
    }

    async getAll() {
        try {
            const response = await fetch(`${this.apiOrigin}/api/todos`, {
                headers: {
                    Authorization: `Bearer ${TodoService.token}`,
                },
            });
            if(response.status === 200) {
                return response.json();
            } else {
                throw await response.json()
            }
            
        } catch (e ) {
            throw e;
        }
        
    }
}

export default TodoService;