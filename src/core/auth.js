export class Auth {
    constructor(passage) {
        this.passage = passage;
    }

    async userInfo() {
        try {
            const app = this.passage.getCurrentUser();
            return await app.userInfo();
        } catch (error) {
            return error;
        }
    }

    async logout(){
        try {
            const session = await this.passage.getCurrentSession();
            return await session.signOut();
        }catch (error) {
            console.log("logout error:"+ error);
            return false;
        }
    }
    async listDevices() {
        try {
            const user = await this.passage.getCurrentUser();
            return await user.listDevices();
        }catch (error) {
            console.log("listDevices error: " + error);
            return error;
        }
    }

    async checkGuard(){
        try {
            const session = await this.passage.getCurrentSession();
            return await session.authGuard();
        }catch (error) {
            console.log('checkGuard error: ' + error);
            return false;
        }
    }

    async identifierExists(identifier) {
        const userInfo = await this.passage.identifierExists(identifier);
        if (!userInfo || userInfo.user === null) {
           return await this._register(identifier);
        } else {
            const result = await this._checkWebAuthConfig();
            if (!result) {
                console.log("web auth not configured");
            }
            const isSupport = await this._checkWebAuthSupport();
            if (!isSupport) {
                console.log("web auth not supported");
            }
           return await this._login(identifier);
        }
    }

    async _register(identifier) {
        try {
            return await this.passage.register(identifier);
        }catch (error) {
            console.log("register failed: " + error);
            return error;
        }
    }

    async _login(identifier) {
        try {
            return await this.passage.login(identifier);
        }catch (error) {
            console.log("login failed: " + error);
            return error;
        }
    }

    async _checkWebAuthConfig() {
        const userInfo = await this.passage.appInfo();
        return this.passage.checkWebauthnConfig(userInfo);
    }

    async _checkWebAuthSupport() {
        return this.passage.isWebauthnSupported(true);
    }
}
