import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import {
    RecoilRoot,
    useSetRecoilState
} from 'recoil';
import { userState } from "./store/atoms/userState";
import axios from "axios";
import { BASE_URL } from "./config";
import Courses from "./components/Courses";
import Course from "./components/Course";
import AddCourse from "./components/AddCourse";
import Unauthorized from "./components/Unauthorized";
import { useEffect } from "react";


export default function App() {
    return (
        <RecoilRoot>
            <Router>
                <div style={{ margin: "0px", padding: "0px" }}>
                    <Appbar />
                    <InitUser />
                </div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/addCourse" element={<AddCourse />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<Course />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </Router>
        </RecoilRoot>
    )
}
function InitUser() {
    const setUser = useSetRecoilState(userState);
    useEffect(() => {
        const init = async () => {
            try {
                const response = await axios.get(`${BASE_URL}admin/me`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.data.username) {
                    setUser({
                        isUserLoading: false,
                        username: response.data.username,
                    })
                }
                else {
                    setUser({
                        isUserLoading: false,
                        username: null,
                    })
                }
            } catch (error) {
                setUser({
                    isUserLoading: false,
                    username: null
                })
                console.error("Error:", error);
            }
        }
        init();
    }), [setUser]


    return <></>
}