import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userState";
export default function Signup() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate();
    return <div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center", alignItems: "center", height: "93vh" }}>
        <Typography marginRight="5%" variant="h5">Welcome. Please Sign Up.</Typography>
        <Card sx={{ width: "30%", minWidth: "250px" }}>
            <CardContent>
                <TextField fullWidth autoComplete="off" variant="outlined" label="Email or Username" type="email" value={username} onChange={(event) => {
                    const { value } = event.target;
                    setUsername(value);
                }}></TextField><br /><br />
                <TextField fullWidth autoComplete="off" variant="outlined" label="Password" type="password" value={password} onChange={(event) => {
                    const { value } = event.target;
                    setPassword(value);
                }}></TextField><br /><br />
                <Button variant="contained" style={{ marginLeft: "35%", marginRight: "35%" }} onClick={async () => {
                    try {
                        const response = await axios.post(`${BASE_URL}admin/signup`, { username, password }, {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        });
                        if (response.status == 200) {
                            localStorage.setItem("token", response.data.token)
                            setUser({
                                isUserLoading: false,
                                username: response.data.username
                            });
                            navigate("/addCourse");

                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }

                }}>SIGN UP</Button>
            </CardContent>
        </Card>
    </div>
}