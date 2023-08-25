import React from "react";
import styles from "../../assets/styles/styles.module.css";
import { useNavigate } from "react-router-dom";

function Error404() {
    const navigate = useNavigate();
    const goHome = () => {
       navigate("/");
    }

  return (
    <div className={`${styles["container-404"]} text-white bg-gradient-to-r from-blue-600 to-teal-500  h-screen w-12/12 m-0 relative`}>
      <div className="relative h-screen w-full">
        <img
          className="h-screen w-full"
          src="/src/assets/images/bg_city.png"
          alt=""
        />
      </div>

      {/* <div className='relative h-40 w-40'><iframe src="https://giphy.com/embed/YWLDUhxMbpPfY831Fn" width="100%" height="100%" className='absolute' frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/SpiderVerseMovie-marvel-spiderman-sony-YWLDUhxMbpPfY831Fn">via GIPHY</a></p> */}
      {/* <iframe src="https://giphy.com/embed/YWLDUhxMbpPfY831Fn" width="100%" height="100%" className='absolute' frameBorder="3"   allowFullScreen></iframe> */}
      <div className="absolute bottom-0 text-center">
        <div className="grid grid-cols-2">

        <div className="items-center text-6xl">
            <h1> 404</h1>
            <p>Page not found.</p>
            <button onClick={() => goHome()} className="text-5xl bg-gradient-to-r from-blue-900 to-purple-900 my-12 h-20 w-64">Go home</button>
          </div>
          <img
            className={""}
            width="650px"
            src="/src/assets/gifs/giphy_spidey.gif"
            alt=""
          />

        </div>
      </div>

      {/* <iframe src="https://giphy.com/embed/YWLDUhxMbpPfY831Fn" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/SpiderVerseMovie-marvel-spiderman-sony-YWLDUhxMbpPfY831Fn">via GIPHY</a></p> */}
    </div>
  );
}

export default Error404;
