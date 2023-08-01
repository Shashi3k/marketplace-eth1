
import { handler as createNetworkHook } from "./useNetwork"
import {handler as createAccountHook} from "./useAccount"

export const setupHooks=(...deps)=>{
    
    return{
        useAccount:createAccountHook(...deps),
        useNetwork:createNetworkHook(...deps)
    }
}