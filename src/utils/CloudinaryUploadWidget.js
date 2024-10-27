import React, { createContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import "../common/style/common.style.css";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, uploadImage }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");

      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }

      // 랜더 준비가 되었다면 바로 addeventlistenr widge open을 설정해주기
      initializeCloudinaryWidget();
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          uploadImage(result.info.secure_url);
        }
      }
    );

    const widget = document.getElementById("upload_widget");
    widget.addEventListener("click", openWidge);

    function openWidge() {
      myWidget.open();
      // 클릭할때마다 listener 값을 없애주기
      // widge을 취소하고 다시 클릭할때마다 중복되어 생성됨을 방지
      widget.removeEventListener("click", openWidge);
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        id="upload_widget"
        size="sm"
        className="ml-2"
        onClick={initializeCloudinaryWidget}
      >
        Upload Image +
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
