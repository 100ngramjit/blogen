import { Button } from "@radix-ui/themes";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between flex-wrap p-3 bg-primary">
      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="font-semibold text-xl tracking-tight">Blogs</span>
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
        <Button variant="outline">Download</Button>
      </div>
    </div>
  );
};
export default Navbar;
