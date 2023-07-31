
import Image from "next/legacy/image"
import Link from "next/link"

export default function List({courses}) {
  return (
    <section className="grid grid-cols-2 gap-4 mb-5">
      { courses.map(course =>
        <div key={course.index} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="flex h-full">
            <div className="flex h-full">
              <Image 
               src={course.coverImage}
                alt={course.title}
                height="230"
                width="200"
                layout="fixed" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.type}</div>
              <Link href={`/course/${course.slug}`} legacyBehavior>
              <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{course.title}</a></Link>
              <p className="mt-2 text-gray-500">{course.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
