"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function BookCal() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "30min" });
            cal("floatingButton", {
                calLink: "syenxa-tech/30min",
                config: { layout: "month_view" },
            });
            cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
        })();
    }, []);
}
