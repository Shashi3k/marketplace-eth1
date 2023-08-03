import Link from "next/link";
import Image from "next/legacy/image";



export default function Card({course, Footer}){

    return (
        <div key={course.index} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="flex h-full">
            <div className="flex-1 h-full next-image-wrapper">
              <Image 
               src={course.coverImage}
                alt={course.title}
                height="230"
                width="200"
                layout="responsive" />
            </div>
            <div className="p-8 pb-4 flex-2">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.type}</div>
              <Link href={`/course/${course.slug}`} legacyBehavior>
              <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{course.title}</a></Link>
              <p className="mt-2 text-gray-500 ">{course.description.substring(0,95)}</p>
                <Footer />
            </div>
          </div>

        </div>
    )
}