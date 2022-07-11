import React from "react";
import { IUser } from "../../Interfaces/GlobalInterfaces";

interface UserListProps {
  users: IUser[];
}

export const UserList: React.FC<UserListProps> = ({ users }: UserListProps) => {
  console.log("users length:::", users.length);
  if (users.length === 0) return null;

  const UserRow = (user: IUser, index: number) => {
    return (
      <tr key={index} className={index % 2 === 0 ? "odd" : "even"}>
        <td>{index + 1}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    );
  };

  const userTable = users.map((user: IUser, index: number) =>
    UserRow(user, index)
  );

  return (
    <div className="container">
      <h2>Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{userTable}</tbody>
      </table>
    </div>
  );
};
