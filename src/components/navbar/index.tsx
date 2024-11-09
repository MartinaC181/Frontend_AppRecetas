import Link from "next/link";

const navItems = [
    {
        name: "Home",
        route: "/",
    },
    {
        name: "categories",
        route: "/category",
    },
    {
        name: "Recipes",
        route: "/recipe",
    },
]


export default function Navbar() {
    return (
        <nav className="flex justify-center py-2 gap-4 items-center bg-slate-600 w-full ">
            {navItems.map((item) => {
                return (
                    <Link key={item.name} href={item.route} className="w-100px rounded-md at-8 p-0 m-2 hover:underline">
                        {item.name}
                    </Link>
                );
            })}         
        </nav>
    );
}
