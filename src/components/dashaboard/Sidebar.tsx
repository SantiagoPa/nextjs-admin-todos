import Image from "next/image";
import Link from "next/link";
import { CiBookmarkCheck, CiLogout } from "react-icons/ci";
import { RiDashboardFill } from "react-icons/ri";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline } from "react-icons/io5";


const MENU_ITEMS = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos"
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos"
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
    path: "/dashboard/cookies"
  },
  {
    icon: <IoBasketOutline />,
    title: "Productos",
    path: "/dashboard/products"
  },
]

export const Sidebar = () => {
  return (
    // <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] border-r border-gray-200 bg-white">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="/" >
              {/* Next/Image */}
              <RiDashboardFill className="h-10 w-10" />
            </Link>
          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image
              src="https://avatars.githubusercontent.com/u/55114663?s=96&v=4"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              height={350}
              width={300}
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              spadilla
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8" >
            {
              MENU_ITEMS.map((menu)=>(
                <SidebarItem  key={menu.path} {...menu} />
              ))
            }
          </ul>

        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-200">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    // </>
  );
};
