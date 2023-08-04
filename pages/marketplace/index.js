import { CourseCard, CourseList } from "@components/ui/course"
import { getAllCourse } from "@content/courses/fetcher"
import { BaseLayout as MarketplaceLayout } from "@components/ui/layout"
import {  Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { useWalletInfo } from "@components/hooks/web3"
import {MarketHeader} from "@components/ui/Marketplace"


export default function Marketplace({courses}){

    const [selectedCourse, setselectedCourse]=useState(null)
    const {  canPurchaseCourse}=useWalletInfo()
    const purchaseCourse = (order) => {
        alert(JSON.stringify(order))
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
            disabled={canPurchaseCourse}
            Footer={()=>
                <div className="mt-4">
                <Button onClick={()=> setselectedCourse(course)} disabled={canPurchaseCourse} variant="green">
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
                nSubmit={purchaseCourse}
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