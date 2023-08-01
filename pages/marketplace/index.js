import { CourseList } from "@components/ui/course"
import { WalletBar } from "@components/ui/web3"
import { useAccount } from "@components/hooks/web3/useAccount"
import { getAllCourse } from "@content/courses/fetcher"
import { BaseLayout as MarketplaceLayout } from "@components/ui/layout"
import { useNetwork } from "@components/hooks/web3/useNetwork"

export default function Marketplace({courses}){

    const {account} =useAccount()
    const {network} =useNetwork()

    return (
        <>
        <MarketplaceLayout>
        <div className="py-4">
            {network.data}
        <WalletBar 
            address={account.data} 
        />
        </div>
        <CourseList courses={courses} />
        </MarketplaceLayout>
        </>
    )
}


export function getStaticProps(){
    const {data}=getAllCourse()
    return{
        props:{
            courses:data
        }
    }
}