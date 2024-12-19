import CourseList from "./_components/CourseList";
import WelcomeBanner from "./_components/WelcomeBanner";

export default function Courses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5">
      <div className="col-span-3">
        <WelcomeBanner />
        <CourseList />
      </div>
      <div>d</div>
    </div>
  );
}
