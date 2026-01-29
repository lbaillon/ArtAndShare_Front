import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
const baseFontSize = isFirefox ? 15 : 20;

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <StrictMode>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: "Figtree, sans-serif",
                        fontSize: baseFontSize,
                        colorPrimary: "#000000",
                        borderRadius: 16,
                    },
                    components: {
                        Dropdown: {
                            borderRadiusLG: 16,
                            controlItemBgHover: "#f0f0f0",
                            controlItemBgActive: "#000000",
                        },
                        Button: {
                            borderRadius: 50,
                        },
                    },
                }}
            >
                <App />
            </ConfigProvider>
        </StrictMode>
    </BrowserRouter>,
);
