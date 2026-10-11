import { use } from "react";
import AuthContext from "../contexts/AuthContext";

export default function useAuth() {
    return use(AuthContext);
}
