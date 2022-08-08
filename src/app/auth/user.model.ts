export class User {
    constructor(public idToken:string, public email: string, public refreshToken:string, public expiresIn: string, public localId: string) {
        
    }

    get token() {
        const expirationDate = new Date(new Date().getTime() + (Number(this.expiresIn) * 1000));
        if(!this.expiresIn || new Date() > expirationDate) {
            return null;
        }
        return this.idToken;
    }
 

}