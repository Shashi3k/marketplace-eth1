import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout as OwnedLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/Marketplace";

export default function OwnedCourses() {

  return (
    <>
    <OwnedLayout>
    <div className="py-4">
      <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
      </OwnedLayout>
    </>
  )
}