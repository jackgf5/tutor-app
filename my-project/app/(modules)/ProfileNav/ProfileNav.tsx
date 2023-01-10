"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ProfileNav = ({ session }: { session: Session }) => {
  const router = useRouter();
  const role = session?.user?.role;
  const pathname = usePathname();

  const handleRoleChange = async () => {
    const currentRole = session.user?.role;
    const id = session?.user?.id;
    let roleToChange;

    if (currentRole === "STUDENT") {
      roleToChange = "TEACHER";
    } else if (currentRole === "TEACHER") {
      roleToChange = "STUDENT";
    } else {
      roleToChange = currentRole;
    }

    const res = await fetch("/api/auth/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentRole, roleToChange, id }),
    });
    if (pathname === "/") {
      router.refresh();
    } else {
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-8 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">
            {role!.charAt(0).toUpperCase() + role!.slice(1).toLowerCase()}
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={handleRoleChange}
            />
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNav;
