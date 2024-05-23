import axios from "axios";
import { BACKEND_API } from "../constants";
import { Loader } from "@googlemaps/js-api-loader";

const api = axios.create({
    baseURL: BACKEND_API,
});

//toDo check if all routes exist in here and backend

//ADMIN

//ADMIN/ADMINS
export const postAdmin = async (userToken, data) => {
    try {
        const response = await api.post("/admin/admins", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAdmins = async (userToken) => {
    try {
        const response = await api.get("/admin/admins", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/CATEGORIES
export const putAdminCategory = async (userToken, id, data) => {
    try {
        const response = await api.put(`/admin/categories/${id}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postAdminCategory = async (userToken, data) => {
    try {
        const response = await api.post("/admin/categories", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/PROJECTORS
export const putProjector = async (userToken, id, data) => {
    try {
        const response = await api.put(`/admin/projectors/${id}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAdminProjectors = async (userToken) => {
    try {
        const response = await api.get("/admin/projectors", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postProjector = async (userToken, data) => {
    try {
        const response = await api.post("/admin/projectors", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchAdminProjector = async (userToken, id, data) => {
    try {
        const response = await api.patch(`/admin/projectors/${id}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/PROJECTORS/RESERVED
export const fetchAdminProjectorsReserved = async (userToken) => {
    try {
        const response = await api.get("/admin/projectors/reserved", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/RENTALAGREEMENTS
export const fetchAdminRentalAgreements = async (userToken) => {
    try {
        const response = await api.get("/admin/rentalagreements", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/RENTALAGREEMENTS
export const putAdminRentalAgreements = async (
    userToken,
    rentalagreementId,
    data
) => {
    try {
        const response = await api.put(
            `/admin/rentalagreements/${rentalagreementId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/RENTALAGREEMENTS/{rentalagreementId}/EXHIBITORS/PLACES
export const fetchAdminPlacesExhibitor = async (
    userToken,
    rentalagreementId
) => {
    try {
        const response = await api.get(
            `/admin/rentalagreements/${rentalagreementId}/exhibitors/places`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ADMIN/RENTALAGREEMENTS/{rentalagreementId}/PROJECTORS/AVAILABLE/SEARCH
export const fetchAdminAvailableExhibitorProjectorsSearchWithCurrent = async (
    userToken,
    rentalagreementId,
    startDate,
    endDate
) => {
    try {
        const response = await api.get(
            `admin/rentalAgreements/${rentalagreementId}/projectors/available/search`,
            {
                params: {
                    startDate,
                    endDate,
                },
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/PLACES
export const putExhibitorPlace = async (userToken, placeId, data) => {
    try {
        const response = await api.put(`exhibitor/places/${placeId}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postExhibitorPlace = async (userToken, data) => {
    try {
        const response = await api.post("exhibitor/places", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/PLACES/MINE
export const fetchExhibitorPlacesMine = async (userToken) => {
    try {
        const response = await api.get("exhibitor/places/mine", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/RENTALAGREEMENTS
export const postExhibitorRentalAgreements = async (userToken, data) => {
    try {
        const response = await api.post("/exhibitor/rentalagreements", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/RENTALAGREEMENTS/MINE
export const fetchExhibitorRentalAgreementsMine = async (userToken) => {
    try {
        const response = await api.get("/exhibitor/rentalagreements/mine", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/RENTALAGREEMENTS/MINE/AVAILABLE
export const fetchExhibitorRentalAgreementsMineAvailable = async (
    userToken
) => {
    try {
        const response = await api.get(
            "/exhibitor/rentalagreements/mine/available",
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/RENTALAGREEMENTS/MINE/AVAILABLE
export const fetchExhibitorRentalAgreementsMineAvailableWithCurrent = async (
    userToken,
    expositionId
) => {
    try {
        const response = await api.get(
            `/exhibitor/rentalagreements/mine/available/${expositionId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/PROJECTORS/AVAILABLE/SEARCH
export const fetchAvailableExhibitorProjectorsSearch = async (
    userToken,
    startDate,
    endDate
) => {
    try {
        const response = await api.get(
            "/exhibitor/projectors/available/search",
            {
                params: {
                    startDate,
                    endDate,
                },
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/EXPOSITIONS
export const postExhibitorExposition = async (userToken, data) => {
    try {
        const response = await api.post("/exhibitor/expositions", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const putExhibitorExposition = async (userToken, id, data) => {
    try {
        const response = await api.put(`/exhibitor/expositions/${id}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchExhibitorExposition = async (userToken, id, data) => {
    try {
        const response = await api.patch(`/exhibitor/expositions/${id}`, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/EXPOSITIONS/MINE
export const fetchExhibitorExpositionsMine = async (userToken) => {
    try {
        const response = await api.get("/exhibitor/expositions/mine", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITOR/EXPOSITIONS/MINE
export const fetchExhibitorExpositionsMineActiveIds = async (userToken) => {
    try {
        const response = await api.get(
            "/exhibitor/expositions/mine/active/ids",
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//EXHIBITORS
export const postExhibitor = async (data) => {
    try {
        const response = await api.post("/exhibitors", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/users/authenticate", {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ROLES
export const fetchRoles = async () => {
    try {
        const response = await api.get("/roles");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchRoleExhibitor = async () => {
    try {
        const response = await api.get("/roles/exhibitor", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchRoleAdmin = async () => {
    try {
        const response = await api.get("/roles/admin", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//CATEGORIES
export const fetchCategories = async (userToken) => {
    try {
        const response = await api.get("/categories", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//PLACES
export const fetchPlaces = async (userToken) => {
    try {
        const response = await api.get("/places", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//GOOGLE API

/*export const fetchPredictions = async (address) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};*/

/*export const fetchPredictions = async (address) => {
    const loader = new Loader({
        apiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY,
        libraries: ["places"],
    });

    try {
        // Ensure the Google Maps script is loaded before attempting to use it
        await loader.load();

        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results);
                } else {
                    reject(new Error('Geocoder failed due to: ' + status));
                }
            });
        });
    } catch (error) {
        throw new Error('Failed to load the Google Maps script', error);
    }
};*/

function loadPlacesLibrary() {
    const loader = new Loader({
        apiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY,
        libraries: ["places"],
    });
    return loader;
}

export const fetchPredictions = async (inputString) => {
    const loader = loadPlacesLibrary();
    try {
        await loader.load();
        const service = new google.maps.places.PlacesService(
            document.createElement("div")
        );
        return new Promise((resolve, reject) => {
            service.findPlaceFromQuery(
                {
                    query: inputString,
                    fields: [
                        "name",
                        "geometry",
                        "formatted_address",
                        "place_id",
                    ],
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(results);
                    } else {
                        reject(
                            new Error(
                                `Failed to fetch predictions due to: ${status}`
                            )
                        );
                    }
                }
            );
        });
    } catch (error) {
        console.error("Failed to load Google Maps API", error);
        throw error;
    }
};

export const fetchAutoCompleteMaps = async (inputString) => {
    const loader = loadPlacesLibrary();
    try {
        await loader.load();
        const service = new google.maps.places.AutocompleteService();
        return new Promise((resolve, reject) => {
            service.getPlacePredictions(
                { input: inputString },
                (results, status) => {
                    if (status === "OK") {
                        resolve(results);
                    } else {
                        reject(
                            new Error(
                                `Failed to fetch address info due to: ${status}`
                            )
                        );
                    }
                }
            );
        });
    } catch (error) {
        console.error("Failed to load Google Maps API", error);
        throw error;
    }
};

export const fetchAddressInfo = async (address) => {
    const loader = loadPlacesLibrary();
    try {
        await loader.load();
        const geocoder = new google.maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === "OK") {
                    resolve(results);
                } else {
                    reject(
                        new Error(
                            `Failed to fetch address info due to: ${status}`
                        )
                    );
                }
            });
        });
    } catch (error) {
        console.error("Failed to load Google Maps API", error);
        throw error;
    }
};

//prev fetchPlaceDetails
export const fetchLatLong = async (placeId) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`
        );
        return response.data.result;
    } catch (error) {
        console.error("Error fetching place details:", error.message);
        return null;
    }
};

/*export const fetchAddressInfo = async (address) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};*/
