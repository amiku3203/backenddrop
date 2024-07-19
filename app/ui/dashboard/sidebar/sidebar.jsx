"use client"
import Image from "next/image";
import MenuLink from "./menulinks/menuLink";
import styles from "./sidebar.module.css";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { GrGallery } from "react-icons/gr";
// import { auth, signOut } from "@/app/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { FaHeadSideVirus } from "react-icons/fa6";
import { TbPlayFootball } from "react-icons/tb";
import { FcBusinessContact } from "react-icons/fc";
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      // {
      //   title: "Users",
      //   path: "/dashboard/users",
      //   icon: <MdSupervisedUserCircle />,
      // },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Gallery",
        path:"/dashboard/gallery",
        icon: <GrGallery />
      },
      {
        title: "Header",
        path:"/dashboard/header",
        icon: <FaHeadSideVirus/>
      },
      {
        title: "Footer",
        path:"/dashboard/footer",
        icon: <TbPlayFootball/>
      },
      {
        title: "Contact Us",
        path:"/dashboard/contactus",
        icon: <FcBusinessContact />
      }
      // {
      //   title: "Transactions",
      //   path: "/dashboard/transactions",
      //   icon: <MdAttachMoney />,
      // },
    ],
  },
  // {
  //   title: "Analytics",
  //   list: [
  //     {
  //       title: "Revenue",
  //       path: "/dashboard/revenue",
  //       icon: <MdWork />,
  //     },
  //     {
  //       title: "Reports",
  //       path: "/dashboard/reports",
  //       icon: <MdAnalytics />,
  //     },
  //     {
  //       title: "Teams",
  //       path: "/dashboard/teams",
  //       icon: <MdPeople />,
  //     },
  //   ],
  // },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/dashboard/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/dashboard/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];

const Sidebar = async () => {
  // const { user } = await auth();
  const router= useRouter();
  const handleLogout = () => {
    // Clear any authentication tokens or session data here if needed
    toast.success('Logout successful!');
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={ "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Admin</span>
          <span className={styles.userTitle}>Bizto india</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      > */}
       <button className={styles.logout} onClick={
        handleLogout}>
        <MdLogout />
        Logout
      </button>
      {/* </form> */}
    </div>
  );
};

export default Sidebar;