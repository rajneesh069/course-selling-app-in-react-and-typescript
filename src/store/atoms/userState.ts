import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: {
        isUserLoading: true,
        username: null
    }
});