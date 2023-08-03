import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout as ManageLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/Marketplace";

export default function ManageCourses() {

  return (
    <>
    <ManageLayout>
        <div className="py-4">
      <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
      </ManageLayout>
    </>
  )
}