import {useAuth} from "../store/useAuth.js";

export default async function auth({next, router}){
    const auth = useAuth();
    await auth.checkAuthGuard();
    console.log(auth.isLoggedIn)
    if(!auth.isLoggedIn){
        return router.push({name:"login"}).catch((_) => {});
    }
    return next();
}
