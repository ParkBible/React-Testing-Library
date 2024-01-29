import { useState } from "react";
import Popup from "../popup/Popup";

export default function Home() {
    const [isPopupShow, setIsPopupShow] = useState<Boolean>(true);

    return (
        <>
            <div className="home-wrap">
                HOME
            </div>
            {
                isPopupShow && <Popup setIsShow={setIsPopupShow}/>
            }
        </>
    )
}