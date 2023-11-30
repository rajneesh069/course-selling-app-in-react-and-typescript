import { useParams } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { singleCourseState } from "../store/atoms/singleCourseState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSingleCourseLoadingState } from "../store/selectors/isLoading";
import { LinearProgress } from "@mui/material";
import CourseCard from "./CourseCard";


export default function Course() {
    const setCourse = useSetRecoilState(singleCourseState);
    const { courseId } = useParams();
    const isCourseLoading = useRecoilValue(isSingleCourseLoadingState);
    useEffect(() => {
        const init = async () => {
            const response = await axios.get(`${BASE_URL}admin/courses/${courseId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data.course) {
                setCourse({
                    isCourseLoading: false,
                    course: response.data.course,
                });
            } else {
                return "Error 404"
            }
        };
        init();
    }, [courseId, setCourse])

    if (isCourseLoading) {
        return <LinearProgress />
    }
    else {
        return <CourseCard />
    }

}
