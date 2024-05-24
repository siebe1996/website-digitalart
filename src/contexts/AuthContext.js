// AuthContext.js
import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useMemo,
} from "react";
import {
    setSecureItemAsync,
    getSecureItemAsync,
    removeSecureItemAsync,
} from "../services/LocalStorageService";
import {
    loginUser,
    postExhibitor,
    postUserAdmin,
} from "../services/ApiService";
import axios from "axios";
import { BACKEND_API } from "../constants";
//import { convertBase64ToImage } from "../services/HelperFunctions";

export const AuthContext = createContext();

const api = axios.create({
    baseURL: BACKEND_API,
});

function authReducer(state, action) {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...state,
                userToken: action.token,
                userRoles: action.userRoles,
                isLoading: false,
                user: action.user,
            };
        case "SIGN_IN":
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
                userRoles: action.userRoles,
                user: action.user,
            };
        case "SIGN_OUT":
            return {
                ...state,
                isSignout: true,
                userToken: null,
                userRoles: null,
                user: null,
            };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: null,
        userRoles: null,
        user: null,
    });

    useEffect(() => {
        // Retrieve the userToken from local storage when the component mounts
        const bootstrapAsync = async () => {
            let userToken = null;
            let userRoles = null;
            let user = null;
            try {
                userToken = await getSecureItemAsync("userToken");
                userRoles = JSON.parse(
                    (await getSecureItemAsync("userRoles")) || []
                );
                user = JSON.parse((await getSecureItemAsync("user")) || "{}");
            } catch (e) {
                // Restoring token failed
                console.log(
                    "restoring token failed, something went wrong in context"
                );
            }

            // Dispatch the token to restore the state
            dispatch({
                type: "RESTORE_TOKEN",
                token: userToken,
                userRoles: userRoles,
                user: user,
            });
        };

        bootstrapAsync();
    }, []); // The empty dependency array ensures this effect runs once on component mount

    const authContext = {
        signIn: async (email, password) => {
            try {
                let user = await loginUser(email, password);
                const token = user.jwtToken;
                const userRoles = user.roles;
                if (
                    userRoles.includes("Admin") ||
                    userRoles.includes("Exhibitor")
                ) {
                    console.log("userRoles in signin", userRoles);
                    delete user.jwtToken;
                    delete user.roles;
                    await setSecureItemAsync("userToken", token);
                    await setSecureItemAsync(
                        "userRoles",
                        JSON.stringify(userRoles)
                    );
                    await setSecureItemAsync("user", JSON.stringify(user));
                    dispatch({
                        type: "SIGN_IN",
                        token: token,
                        user: user,
                        userRoles: userRoles,
                    });
                    return true;
                }
                /*console.log("userRoles in signin", userRoles);
                delete user.jwtToken;
                delete user.roles;
                await setSecureItemAsync("userToken", token);
                await setSecureItemAsync(
                    "userRoles",
                    JSON.stringify(userRoles)
                );
                await setSecureItemAsync("user", JSON.stringify(user));
                if (
                    userRoles.includes("Admin") ||
                    userRoles.includes("Exhibitor")
                ) {
                    dispatch({
                        type: "SIGN_IN",
                        token: token,
                        user: user,
                        userRoles: userRoles,
                    });
                    return true;
                }*/
            } catch (error) {
                // Handle authentication errors
                console.error("Authentication failed:", error);
                return false;
                // You can show an error message to the user if needed.
            }
        },
        signOut: async () => {
            await removeSecureItemAsync("user");
            await removeSecureItemAsync("userToken");
            await removeSecureItemAsync("userRoles");
            dispatch({ type: "SIGN_OUT" });
        },
        signUp: async (data) => {
            try {
                const regUser = await postExhibitor(data);
                const objUserData = JSON.parse(data);
                console.log(
                    "Logging in with email:",
                    objUserData.email,
                    "and password:",
                    objUserData.password
                );
                console.log("reguser.email", regUser.email);
                if (regUser && regUser.email) {
                    const user = await loginUser(
                        objUserData.email,
                        objUserData.password
                    );
                    const token = user.jwtToken;
                    const userRoles = user.roles;
                    console.log("userRoles in signup", userRoles);
                    delete user.jwtToken;
                    delete user.roles;
                    await setSecureItemAsync("user", JSON.stringify(user));
                    await setSecureItemAsync(
                        "userRoles",
                        JSON.stringify(userRoles)
                    );
                    await setSecureItemAsync("userToken", token);
                    if (
                        userRoles.includes("admin") ||
                        userRoles.includes("Exhibitor")
                    ) {
                        dispatch({
                            type: "SIGN_IN",
                            token: token,
                            user: user,
                            userRoles: userRoles,
                        });
                        return true;
                    }
                } else {
                    console.error(
                        "Authentication failed: User data not received in response"
                    );
                    return false;
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                return false;
            }
        },
    };

    const providerValue = useMemo(() => ({ state, ...authContext }), [state]);

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
