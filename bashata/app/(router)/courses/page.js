import CourseList from "./_components/CourseList";
import WelcomeBanner from "./_components/WelcomeBanner";

export default function Courses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5">
      <div className="col-span-2">
        <WelcomeBanner />
        <CourseList />
      </div>
      <div>d</div>
    </div>
  );
}
