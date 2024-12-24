import CourseList from "./_components/CourseList";
import SideBanners from "./_components/SideBanners";
import WelcomeBanner from "./_components/WelcomeBanner";

export default function Courses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-5">
      <div className="col-span-3">
        <WelcomeBanner />
        <CourseList />
      </div>
      <div className="p-5 bg-white rounded-xl">
        <SideBanners />
      </div>
    </div>
  );
}
