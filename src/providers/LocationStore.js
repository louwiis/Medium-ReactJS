import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthStore";

const socket = io("http://edu.project.etherial.fr");

export const LocationContext = createContext()

export function LocationProvider(props) {
    const { token } = useContext(useAuth);

    const [location, setLocation] = useState({});

    useEffect(() => {   
        socket.disconnect();
        socket.connect();

        socket.emit("auth", token);
        socket.on("positions", ({ data }) => {
            setLocation(data);

            navigator.geolocation.getCurrentPosition((position) => {
                if (!token) return;
                socket.emit("update_position", {
                    point_lat: position.coords.latitude,
                    point_lon: position.coords.longitude,
                });
            });
        });
    }, [token]);

    return (
        <LocationContext.Provider value={{
            location
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}