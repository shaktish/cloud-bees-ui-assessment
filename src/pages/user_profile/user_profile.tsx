import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { UserDetail } from "./model";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/errorMessage";
import { aboutData } from "./data.js";

const UserProfile = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState<UserDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          setLoading(false);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setUser(data);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, [id]);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{ textTransform: "none", marginBottom: "10px", fontWeight: "400" }}
        onClick={() => navigate("/")}
      >
        Back to User list
      </Button>
      {loading && <Loader />};{error && <ErrorMessage />}
      {!loading && !error && user && (
        <>
          <Card sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={user.avatar_url}
                alt={user.login}
                sx={{ width: 160, height: 160, boxShadow: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ flex: "1 1 0" }}>
                  <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2">
                    Location: {user.location ? user.location : "-"}
                  </Typography>
                </CardContent>
                <Divider orientation="vertical" flexItem />
                <CardContent sx={{ flex: "1 1 0" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" align="left" fontWeight={500}>
                        Followers:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{user.followers}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" align="left" fontWeight={500}>
                        Following:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{user.following}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" align="left" fontWeight={500}>
                        Publice Repos
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {user.public_repos}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Box>
          </Card>
          <Card sx={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h6" marginBottom={1}>
              About
            </Typography>
            <Typography variant="body2">
              {aboutData.slice(
                0,
                Math.floor(Math.random() * (500 - 300 + 1)) + 50
              )}
            </Typography>
          </Card>
        </>
      )}
    </>
  );
};

export default UserProfile;
