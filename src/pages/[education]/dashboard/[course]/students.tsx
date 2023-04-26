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
// <UserLayout>
//   <div className="flex flex-col mt-4">
//     <h1 className="text-2xl font-bold mb-4">Deltagararkivet</h1>
//     <table className="table-auto w-full">
//       <thead>
//         <tr>
//           <th className="px-4 py-2"></th>
//           <th className="px-4 py-2">Namn</th>
//           <th className="px-4 py-2">Progression</th>
//           <th className="px-4 py-2">Slutbetyg</th>
//           <th className="px-4 py-2">Högsta betyg</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="border px-4 py-2">
//             <img
//               className="w-8 h-8 rounded-full"
//               src="https://via.placeholder.com/50x50.png?text=Avatar"
//               alt=""
//             />
//           </td>
//           <td className="border px-4 py-2">Student 1</td>
//           <td className="border px-4 py-2">3/5</td>
//           <td className="border px-4 py-2">A</td>
//           <td className="border px-4 py-2">B</td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2">
//             <img
//               className="w-8 h-8 rounded-full"
//               src="https://via.placeholder.com/50x50.png?text=Avatar"
//               alt=""
//             />
//           </td>
//           <td className="border px-4 py-2">Student 2</td>
//           <td className="border px-4 py-2">4/5</td>
//           <td className="border px-4 py-2">B</td>
//           <td className="border px-4 py-2">C</td>
//         </tr>
//         <tr>
//           <td className="border px-4 py-2">
//           </td>
//           <td className="border px-4 py-2">Student 3</td>
//           <td className="border px-4 py-2">2/5</td>
//           <td className="border px-4 py-2">D</td>
//           <td className="border px-4 py-2">A</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </UserLayout>
