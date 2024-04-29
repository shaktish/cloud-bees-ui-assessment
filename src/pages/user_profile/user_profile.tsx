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

const UserProfile = () => {
  const navigate = useNavigate();
  const aboutData = `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text
  ever since the 1500s, when an unknown printer took a galley of
  type and scrambled it to make a type specimen book. It has
  survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. It was
  popularised in the 1960s with the release of Letraset sheets
  containing Lorem Ipsum passages, and more recently with desktop
  publishing software like Aldus PageMaker including versions of
  Lorem Ipsum. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc`;

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
      .catch(() => {
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
