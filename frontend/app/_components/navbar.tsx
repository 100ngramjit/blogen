import { Button } from "@/components/ui/button";

const Navbar = ({ handleLogout }: any) => {
  return (
    <header className="px-4 lg:px-5 py-2 flex items-center justify-between rounded-b-3xl bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white fixed w-full">
      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="font-semibold text-xl tracking-tight">Blogen</span>
      </div>
      <div className="block lg:hidden">
        <title>Menu</title>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Docs
          </a>
          <a href="" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Examples
          </a>
          <a href="" className="block mt-4 lg:inline-block lg:mt-0">
            Blog
          </a>
        </div>
      </div>
      <Button variant="destructive" className="bg-dark" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
};
export default Navbar;
