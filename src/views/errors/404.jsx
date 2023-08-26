import React from "react";
import styles from "../../assets/styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import { Image } from '@chakra-ui/react'
function Error404() {
    const navigate = useNavigate();
    const goHome = () => {
       navigate("/");
    }

  return (
    <div className={`${styles["container-404"]} text-white bg-gradient-to-r from-purple-900 to-teal-600  h-screen w-12/12 m-0 relative`}>
      <div className="relative h-screen w-full">
        {/* <img
          className="h-screen w-full"
          src="/public/bg_city.png"
          alt=""
        /> */}
      </div>

      {/* <div className='relative h-40 w-40'><iframe src="https://giphy.com/embed/YWLDUhxMbpPfY831Fn" width="100%" height="100%" className='absolute' frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/SpiderVerseMovie-marvel-spiderman-sony-YWLDUhxMbpPfY831Fn">via GIPHY</a></p> */}
      {/* <iframe src="https://giphy.com/embed/YWLDUhxMbpPfY831Fn" width="100%" height="100%" className='absolute' frameBorder="3"   allowFullScreen></iframe> */}
      <div className="absolute bottom-0 text-center">
        <div className="grid grid-cols-2">
        {/* <link rel="icon" type="image/svg+xml" href="/src/assets/images/wolfie.png" /> */}
        <div className="items-center text-6xl">
            <h1> 404</h1>
            <p>Page not found.</p>
            <button onClick={() => goHome()} className="text-5xl bg-gradient-to-r from-blue-900 to-fuchsia-900 my-12 h-20 w-64">Go home</button>
          </div>
          <img
  className=""
  src="https://i.ibb.co/NF0YDc1/giphy-spidey.gif" // Replace this with the actual image URL
  width="650px"
/>
 {/* <Image src='/src/assets/images/wolfie.png' />
      <iframe src="https://giphy.com/embed/YWLDUhxMbpPfY831Fn" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe> */}

        </div>
      </div>

    </div>
  );
}

export default Error404;
