export default class EnvAccessor {

    static getBackPath(){
        return this.tryGetVar("BACK_PATH")
    }

    static tryGetVar(name: string): string {
        let envElement = process.env[name];
        if(envElement === undefined){
            throw new Error(`Env var ${name} is not set!`)
        }
        return envElement;
    }

    static ensureNecessaryVars(){

    }
}