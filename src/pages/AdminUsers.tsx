import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api";

import { PopUp } from "../components/ui/PopUp";
import { useState } from "react";

interface AdminUsersProps {}

export const AdminUsers = ({}: AdminUsersProps) => {
  const [popUp, setPopUp] = useState<boolean>(false);

  const { data: users } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => await getAllUsers(),
  });
  return (
    <>
      {users && (
        <table className="table-auto">
          <thead>
            <th>id</th>
            <th>email</th>
            <th>role</th>
            {/* <th>actions</th> */}
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "ADMIN" : "USER"}</td>
                {/* <td>
                  {user.admin ? (
                    <PopUp
                      button={<button>delete</button>}
                      onClose={() => {}}
                      popUpTitle="you cannot delete admin users((("
                    >
                      you can only delete default users
                    </PopUp>
                  ) : (
                    <button>delete</button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
