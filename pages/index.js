
import { Hero } from "@components/common"
import { CourseList } from "@components/course"
import { BaseLayout } from "@components/layout"
import {getAllCourse} from "@content/courses/fetcher"

export default function Home({courses}) {
  return (
    <>
    <BaseLayout>
      <Hero />
      <CourseList 
      courses={courses}/>
    </BaseLayout>
    </>
  )
}

export function getStaticProps(){
  const {data}=getAllCourse()
  return {
    props:{
      courses:data
    }
  }
}
