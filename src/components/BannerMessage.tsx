import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useEffect } from "react";
import { toggleShowingBanner } from "../redux/slices/formSlice";

export const BannerMessage = () => {
    const dispatch = useAppDispatch();
    const showingAlert = useAppSelector((state) => state.form.showingAlert);
    const severity = useAppSelector((state) => state.form.bannerSeverity);
    const message = useAppSelector((state) => state.form.bannerMessage);
    const bannerTimeout = useAppSelector((state) => state.form.bannerTimeout);

    useEffect(() => {
        if (showingAlert) {
            setTimeout(() => {
                dispatch(toggleShowingBanner());
            }, bannerTimeout);
        }
    }, [showingAlert])

    if (showingAlert) {
        return <Alert severity={severity}>{message}</Alert>
    } else {
        return null;
    }
}