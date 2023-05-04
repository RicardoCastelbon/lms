import React from "react";
import UserLayout from "@/src/components/ui/UserLayout";
import { School } from "lucide-react";
type Props = {};

const ExercisePage = (props: Props) => {
  // this should be turned into a overlay and maybe placed in another folder.

  const exercises = [
    {
      id: 1,
      name: "useStates i React",
      start: "14:e April",
      handedIn: "12:e Januari",
      grade: "A",
      closed: "A",
    },

    {
      id: 2,
      name: "useRef i React",
      start: "9:e Mars",
      handedIn: "12:e Januari",
      grade: "A",
      closed: "A",
    },

    {
      id: 3,
      name: "useRef i React",
      start: "12:e Januari",
      handedIn: "12:e Januari",
      grade: "A",
      closed: "A",
    },
  ];

  return (
    <UserLayout>
      <div className='flex flex-col'>
        <div className='flex flex-col sm:flex-row items-center font-bold text-lg mb-4'>
          <div className='w-full sm:w-1/4 mb-2 sm:mb-0'>Uppgifter</div>
          <div className='w-full sm:w-3/4 flex justify-end sm:justify-start'>
            <div className='w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block'>
              Startdatum
            </div>
            <div className='w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block'>
              In.datum
            </div>
            <div className='w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block'>
              Omdöme
            </div>
            <div className='w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block'>
              Inlämnat
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className='rounded-lg shadow-md p-4 bg-white mb-4 sm:mb-0 sm:shadow-none sm:bg-transparent'
            >
              <div className='flex flex-col sm:flex-row items-center mb-4'>
                <div className='w-full sm:w-1/4 flex items-center mb-2 sm:mb-0'>
                  <div className=' border-[1px] rounded-full p-1'>
                    <School height='24px' width='24px' strokeWidth='1' />
                  </div>
                  <div className='font-bold'>{exercise.name}</div>
                </div>
                <div className='w-full sm:w-1/4 mb-2 sm:mb-0'>
                  <div className='text-sm text-gray-500'>{exercise.start}</div>
                </div>
                <div className='w-full sm:w-1/4 mb-2 sm:mb-0'>
                  <div className='sm:hidden font-bold mb-1'>Övningar</div>
                  <div className='text-sm text-gray-500'>
                    {exercise.handedIn}
                  </div>
                </div>
                <div className='w-full sm:w-1/4 mb-2 sm:mb-0'>
                  <div className='sm:hidden font-bold mb-1'>Slutprov</div>
                  {exercise.closed}
                </div>
                <div className='w-full sm:w-1/4 mb-2 sm:mb-0'>
                  <div className='sm:hidden font-bold mb-1'>Betyg</div>
                  {exercise.grade}
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
export default ExercisePage;
