import Link from "next/link";

const navItems = [
    {
        label: "Home",
        route: "/home",
    },
    {
        label: "Recipes",
        route: "/recipe",
    },
]


export default function Navbar() {
    return (
        <nav className="w-full flex justify-center items-center p-4 bg-slate-600">
            <div className="flex justify-between items-center w-[1200px]">
                <div className="flex flex-grow justify-center gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.route}
                            className="text-xl w-100px rounded-md at-8 p-0 m-2 hover:underline"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

