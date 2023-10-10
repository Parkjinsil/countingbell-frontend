import {createBrowserRouter} from "react-router-dom";
import Reservation from "./pages/Reservation"

const router = createBrowserRouter ([
    {
        path: "Reservation",
        // element: <Layout header={<Header/>} />,
        children : [
            {
                index: true,
                element: <Reservation />,
            },
        ],
    },
]);

export default router;