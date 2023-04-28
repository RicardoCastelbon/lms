import UserLayout from "@/src/components/ui/UserLayout";
import React from "react";

type Props = {};

const CourseInfo = (props: Props) => {
  return (
    <>
      <UserLayout>
        <div className="flex justify-between">
          <div className="course-info-wrapper">
            <h1>Kursinnehåll</h1>
            <ul>
              <li>React templating & JSX</li>
              <li>States</li>
              <li>Hooks</li>
              <li>Rendering</li>
            </ul>
            <h2>Syfte och mål</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium voluptatum corrupti, maiores similique magnam in
              beatae nobis tempora sint accusamus, ipsa sequi hic alias ducimus
              natus optio rerum velit officia cumque eum sit voluptatem
              consequatur. Magni quisquam ea similique id est quas tempora dicta
              et, minima eveniet delectus atque totam laboriosam voluptatum
              assumenda, a quia.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mr-5">Poäng</h3>
            <span>40 yhp</span>
          </div>
        </div>
      </UserLayout>
    </>
  );
};
/* getServerSideProps */
export default CourseInfo;
