

export default function List({courses,children}) {
  return (
    <section className="grid grid-cols-2 gap-4 mb-5">
      { courses.map(course =>
        children(course)
      )}
    </section>
  )
}
