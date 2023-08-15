import { CourseCard, CourseList } from "@components/ui/course"
import { getAllCourse } from "@content/courses/fetcher"
import { BaseLayout as MarketplaceLayout } from "@components/ui/layout"
import {  Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { useWalletInfo } from "@components/hooks/web3"
import {MarketHeader} from "@components/ui/Marketplace"
import { useWeb3 } from "@components/providers"



export default function Marketplace({courses}){

    const {web3, contract}= useWeb3()
    const [selectedCourse, setselectedCourse]=useState(null)
    const {  canPurchaseCourse, account}=useWalletInfo()
    const purchaseCourse = async order =>{
        const hexCourseId=web3.utils.utf8ToHex(selectedCourse.id)
        console.log(hexCourseId)

        const orderHash = web3.utils.soliditySha3(
            {type: "bytes16", value:hexCourseId},
            {type:"address", value: account.data}
        )

        console.log(orderHash)

        const emailHash = web3.utils.sha3(order.email)

        console.log(emailHash)

        const proof=web3.utils.soliditySha3(
            {type:"btes32", value:orderHash},
            {type:"bytes32", value:emailHash}
        )

        console.log(proof)

        const value = web3.utils.toWei(String(order.price),"ether")

        try{
            const result = await contract.methods.purchaseCourse(
                hexCourseId,
                proof
            ).send({from: account.data, value})
            console.log(result)
        }catch{
            console.error("Purchase course: Operation failed")
        }
    }

    return (
        <>
        <MarketplaceLayout>
            <div >
        <MarketHeader />
        </div>
        <CourseList courses={courses} >
            {course=>
            <CourseCard 
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={()=>
                <div className="mt-4">
                <Button onClick={()=> setselectedCourse(course)} disabled={!canPurchaseCourse} variant="green">
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
                onSubmit={purchaseCourse}
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