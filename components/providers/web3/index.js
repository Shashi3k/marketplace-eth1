const { createContext, useContext, useState, useEffect, useMemo } = require("react");

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Web3Context = createContext(Web3)

export default function Web3Provider({children}){

    const [web3Api, setWeb3Api]=useState(
        {web3:null,
        provider:null,
        contract:null,
        isLoading:true}
    )

    useEffect(()=>{

        const loadProvider= async ()=>{

            const provider=await detectEthereumProvider()
            const web3=new Web3(provider)

            if (provider){
                setWeb3Api(
                    {web3,
                    provider,
                    contract:null,
                    isLoading:false}
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
        return{
            ...web3Api,
            isWeb3Loaded:web3Api.web3!=null,
            connect:web3Api.provider?
            async ()=>{
                try{
                    await web3Api.provider.request({method:"eth_requestAccounts"})
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

export function useWeb3(){
    return useContext(Web3Context)
}