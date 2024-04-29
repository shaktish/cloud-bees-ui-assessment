import { useState, useEffect } from "react";
import { UserResponse } from "./model";
import Typography from "@mui/material/Typography";

const UserList2 = () => {
  const [users, setUsers] = useState<UserResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <Typography variant="h5" marginBottom={1}>
        Users List
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <p>Unable to load users</p>}
      {users &&
        users.length > 0 &&
        users.map((item) => (
          <p key={item.id} role="user-item">
            {item.login}
          </p>
        ))}
    </>
  );
};

export default UserList2;
