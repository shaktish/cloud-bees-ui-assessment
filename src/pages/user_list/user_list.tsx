import { useState, useEffect } from "react";
import { UserResponse } from "./model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Button, Avatar, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import "./style.css";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/errorMessage";

const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/users")
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          setLoading(false);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        console.log(e, "e");
        setLoading(false);
        setError(true);
      });
  }, []);

  const handleClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Typography variant="h5" marginBottom={1}>
        Users List
      </Typography>
      {/* <Card
        data-testid="user-card"
        sx={{ maxWidth: 240 }}
        className="user-card"
        role={"listitem"}
      >
        {" "}
        ss
      </Card> */}
      <Divider orientation="horizontal" sx={{ marginBottom: "20px" }} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {!error &&
          !loading &&
          users &&
          users.map((user) => (
            <Grid item xs={4} lg={4} key={user.id}>
              <Card
                data-testid="user-card"
                sx={{ maxWidth: 240 }}
                key={user.id}
                className="user-card"
                role={"listitem"}
              >
                <Box className="user-image-wrapper">
                  <Avatar
                    src={user.avatar_url}
                    alt={user.login}
                    sx={{ width: 80, height: 80 }}
                  />
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    align="center"
                    style={{ textTransform: "capitalize", fontWeight: "600" }}
                  >
                    {user.login}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {`${user.login.slice(0, 2)}  ${user.type}`}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleClick(user.id)}
                    sx={{ textTransform: "none" }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default UserList;
