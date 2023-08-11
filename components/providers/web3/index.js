const { createContext, useContext, useState, useEffect, useMemo } = require("react");

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";


const Web3Context = createContext(Web3)

export default function Web3Provider({children}){

    const [web3Api, setWeb3Api]=useState(
        {
        web3:null,
        provider:null,
        contract:null,
        isLoading:true,
        hooks:setupHooks()
        }
    )

    useEffect(()=>{

        const loadProvider= async ()=>{

            const provider=await detectEthereumProvider()
            

            if (provider){
                const web3=new Web3(provider)
                const contract=loadContract("CourseMarketPlace",provider)
                setWeb3Api(
                    {web3,
                    provider,
                    contract,
                    isLoading:false,
                    hooks:setupHooks(web3,provider)
                }
                )
            }
            else{
                setWeb3Api(api => ({...api, isLoading: false}))
                console.log("please install metamask")
            }
        }
        
        loadProvider()
    },[])

    const _web3Api=useMemo(()=>{
        const {web3, provider, isLoading}=web3Api
        return{
            ...web3Api,
            requireInstall:!isLoading && !web3,
            connect:provider?
            async ()=>{
                try{
                    await provider.request({method:"eth_requestAccounts"})
                }
                catch{
                    location.reload()
                }
            }:
            ()=>console.error("Please Install MetaMask")
        }
    },[web3Api])


    return(
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useHooks(cb){
    const {hooks}=useWeb3()
    return cb(hooks)
}

export function useWeb3(){
    return useContext(Web3Context)
}