'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-700 text-white text-center p-4 py-1 ">
      <div className="w-[1200px] flex justify-between items-center">
        <div className="text-2xl"> logo</div>

          <div className="text-sm text-white flex flex-col gap-1">
           <p>copyright 2024</p> 
           <p
           className="cursor-pointer hover:text-red-200" onClick={() => {
            window.open("https://github.com/MartinaC181", "_blank");
           }}> 
              MartinaC
            </p>
          </div>

      </div>
    </footer>
  );
}