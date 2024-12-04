

import Header from "../Components/Shared/Header";
import Sidebar from "../Components/Shared/Sidebar";



export default function LayoutUser({ children }: { children: React.ReactNode }) {
  return (
 
    <main className="flex min-h-screen flex-grow">
    <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />
    <Header />
    <div className="flex  w-full flex-col mt-20  xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]"> 
      <div className="">
        {children}
      </div>
    </div>
  </main>

  );
}
