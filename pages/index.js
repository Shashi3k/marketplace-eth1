
import { Footer, Hero } from "@components/ui/common"
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import {getAllCourse} from "@content/courses/fetcher"


export default function Home({courses}) {
  return (
    <>
    <BaseLayout>
      <Hero />
      <CourseList 
      courses={courses}>
        {course=>
        <CourseCard 
        key={course.id}
        course={course}
        />
        }
      </CourseList>
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
