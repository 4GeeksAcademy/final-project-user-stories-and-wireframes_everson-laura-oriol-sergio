import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { About } from "./pages/About";
import { Perfil } from "./pages/Perfil";
import { History } from "./pages/History";
import { Formulary } from "./pages/Formulary";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/history" element={<History />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/formulary" element={<Formulary />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
        </Route>
    )
);