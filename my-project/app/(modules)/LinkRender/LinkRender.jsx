import Link from "next/link";

export function handleLinkRender(session) {
    let link1 = {
      link: "",
      name: "",
    };
    let link2 = {
      link: "",
      name: "",
    };
    let link3 = {
      link: "",
      name: "",
    };

    if (!session) {
      link1.name = "";
      link1.link = "";
      link2.name = "";
      link2.link = "";
      link3.name = "";
      link3.link = "";
    } else if (session?.user?.role === "STUDENT") {
      link1.name = "Explore";
      link1.link = "explore";
      link2.name = "";
      link2.link = "";
      link3.name = "";
      link3.link = "";
    } else if (session?.user?.role === "TEACHER") {
      link1.name = "Dashboard";
      link1.link = "teacher/dashboard";
      link2.name = "";
      link2.link = "";
      link3.name = "";
      link3.link = "";
    }

    return (
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href={`/${link1.link}`}>{link1.name}</Link>
          </li>
          <li>
            <Link href={`/${link2.link}`}>{link2.name}</Link>
          </li>
          <li>
            <Link href={`/${link3.link}`}>{link3.name}</Link>
          </li>
        </ul>
      );
    }
  
