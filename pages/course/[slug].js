import { Modal } from "@components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourse } from "@content/courses/fetcher";

export default function Course({course}) {

  return (
    <BaseLayout>
    {course.title}
    <div className="py-5">
      <CourseHero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </BaseLayout>
  )
}


export function getStaticPaths(){
    const {data}=getAllCourse()

    return{
        paths:data.map(c=>({
            params:{
                slug:c.slug
            }
        })),
        fallback:false
    }
}


export function getStaticProps({params}){
    const {data}=getAllCourse()
    const course=data.filter(c=>c.slug===params.slug)[0]
    return {
        props:{
            course
        }
    }
}