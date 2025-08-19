import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Perfil } from "./pages/Perfil";
import { Forms } from "./pages/Forms/Forms";
import { Resetpassword } from "./components/Resetpassword";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>

            <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
                <Route path="/" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/single/:theId" element={<Single />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/reset-password/:token" element={<Resetpassword />} />

        </>
    )
);
