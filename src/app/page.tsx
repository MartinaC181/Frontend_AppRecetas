import { ModeToggle } from '@/components/dark-mode/buttomTheme';
import Dashboard from '../components/dashboard/dashboard';
import NavbarInicio from '@/components/navbar/navbarInicio';
import { LoginButton } from '@/components/button/loginButton';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <NavbarInicio />
      </div>
      <div>
        <LoginButton />
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        <Dashboard />
      </div>
      <div className="flex justify-end w-full">
        <ModeToggle />
      </div>
    </div>
  );
}
