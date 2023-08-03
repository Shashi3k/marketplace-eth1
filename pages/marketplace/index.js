import { CourseCard, CourseList } from "@components/ui/course"
import { EthRates, WalletBar } from "@components/ui/web3"
import { getAllCourse } from "@content/courses/fetcher"
import { BaseLayout as MarketplaceLayout } from "@components/ui/layout"
import { useAccount, useNetwork } from "@components/hooks/web3"
import { Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { useEthPrice } from "@components/hooks/useEthPrice"


export default function Marketplace({courses}){

    const {account} =useAccount()
    const {network} =useNetwork()
    const {eth,perItem} =useEthPrice()
    const [selectedCourse, setselectedCourse]=useState(null)

    return (
        <>
        <MarketplaceLayout>
        <div className="py-4">
        <WalletBar 
            address={account.data} 
            network={
                {data:network.data,
                target:network.target,
            isSupported:network.isSupported,
            hasInitialResponse:network.hasInitialResponse
        }
            }
        />
        <EthRates eth={eth.data}
         ethPerItem={eth.perItem}/>
        </div>
        <CourseList courses={courses} >
            {course=>
            <CourseCard 
            key={course.id}
            course={course}
            Footer={()=>
                <div className="mt-4">
                <Button onClick={()=> setselectedCourse(course)} variant="green">
                    Purchase
                </Button>
                </div>
            }
            />
            }
        </CourseList>
        {selectedCourse &&
            <OrderModal 
                course={selectedCourse}
                onClose={()=>setselectedCourse(null)}
            />}
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