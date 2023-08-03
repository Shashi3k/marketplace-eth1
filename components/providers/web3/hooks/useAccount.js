import { useEffect } from "react"

import useSWR from "swr" 

const isAdminAddress={
    "0xc063659f4855b3135f23438a4b4e0a9fb8177c052cbd5b9a4b405bc78885e62c":true
}

export const handler = (web3,provider)=>()=>{
    


    const {data,mutate,...rest}=useSWR(()=>
        web3 ? "web3/accounts" :null,
        async()=>{
            const accounts=await web3.eth.getAccounts()
            return accounts[0]
        })

    useEffect(()=>{
        provider && 
        provider.on("accountsChanged",
        accounts=> mutate(accounts[0] ?? null))
    },[provider])

    return {
            data,
            isAdmin:(data && isAdminAddress[web3.utils.keccak256(data)]) ?? false,
            mutate,
        ...rest}
}