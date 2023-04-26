import UserLayout from "@/src/components/ui/UserLayout";
import React from "react";

type Props = {};

const students = (props: Props) => {


  const students = [
    {
      id: 1,
      name: 'Niclas Doe',
      avatar: 'https://via.placeholder.com/50x50.png?text=Avatar',
      inlämningsuppgifter: '3/5',
      exersices: '1/5',
      final: 'A',
      grade: 'A'
    },

    {
      id: 1,
      name: 'Ricardo Doe',
      avatar: 'https://via.placeholder.com/50x50.png?text=Avatar',
      inlämningsuppgifter: '3/5',
      exersices: '1/5',
      final: 'A',
      grade: 'A'
    },
  
    {
      id: 1,
      name: 'Niclas Doe',
      avatar: 'https://via.placeholder.com/50x50.png?text=Avatar',
      inlämningsuppgifter: '3/5',
      exersices: '1/5',
      final: 'A',
      grade: 'A'
    },
  ];
  
  return (

    <UserLayout>
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Student översikt</h1>
      <div className="flex flex-col sm:flex-row items-center font-bold text-lg mb-4">
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0">Deltagare</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Inlämningsuppgifter</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Övningar</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Slutprov</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Betyg</div>
      </div>
      <div className="flex flex-col">
        {students.map((student) => (
          <div key={student.id} className="rounded-lg shadow-md p-4 bg-white mb-4 sm:mb-0 sm:shadow-none sm:bg-transparent">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <div className="w-full sm:w-1/4 flex items-center mb-2 sm:mb-0">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={student.avatar}
                  alt={student.name}
                />
                <div className="font-bold">{student.name}</div>
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Inlämningsuppgifter</div>
                <div className="bg-blue-400 h-2 w-24 rounded-md"></div>
                <div className="text-sm text-gray-500">{student.inlämningsuppgifter}</div>
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Övningar</div>
                <div className="bg-purple-400 h-2 w-12 rounded-md"></div>
                <div className="text-sm text-gray-500">{student.exersices}</div>
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Slutprov</div>
                {student.final}
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Betyg</div>
                {student.grade}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </UserLayout>

);

};
/* getServerSideProps */
export default students;
