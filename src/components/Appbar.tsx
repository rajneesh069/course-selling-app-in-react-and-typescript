import { Typography, Button, CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usernameState } from "../store/selectors/username";
import { isUserLoadingState } from "../store/selectors/isLoading";
import { userState } from "../store/atoms/userState";

export default function Appbar() {
    const navigate = useNavigate();
    const username = useRecoilValue(usernameState);
    const isUserLoading = useRecoilValue(isUserLoadingState);
    const setUser = useSetRecoilState(userState);
    if (isUserLoading) {
        return <CircularProgress />
    }
    if (username) {
        return (
            <div style={{
                margin: "0px",
                padding: "0.25%",
                backgroundColor: "#eee",
            }}>
                <Grid container spacing={2} justifyContent={"space-between"}>
                    <Grid item order={0}>
                        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}> <Typography variant={"h6"}>Coursera</Typography></Link>
                    </Grid>
                    <Grid item order={1}>
                        <Button onClick={() => {
                            navigate("/")
                        }} variant="contained">Home</Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => {
                            navigate("/addCourse")
                        }} variant="contained">Add Course</Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => {
                            navigate("/courses")
                        }} variant="contained">Courses</Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => {
                            setUser({
                                isUserLoading: false,
                                username: null,
                            })
                            localStorage.removeItem("token");
                            navigate("/");
                        }} variant="contained">Logout</Button>
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return (
            <div style={{
                margin: "0px",
                padding: "0.25%",
                backgroundColor: "#eee",
            }}>
                <Grid container spacing={2} justifyContent={"space-between"}>
                    <Grid item order={0}>
                        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}> <Typography variant={"h6"}>Coursera</Typography></Link>
                    </Grid>
                    <Grid item order={1}>
                        <Button onClick={() => {
                            navigate("/signin")
                        }} variant="contained">Sign In</Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => {
                            navigate("/signup")
                        }} variant="contained">Sign Up</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

}