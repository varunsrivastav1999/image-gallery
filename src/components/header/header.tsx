import React from "react";
import {useHistory} from "react-router";
import {getRandomColor} from "../../utils/random-color.utils";

export const Header = () => {
    const history = useHistory();
    const randomColor = getRandomColor();
    const goToProductsPage = () => {
        history.push('/collections');
    }

    return (
        <div className="py-8 text-white text-center select-none">
            <span onClick={goToProductsPage}
                  style={{color: randomColor}}
                  className="cursor-pointer text-6xl font-extrabold font-comfortaa">Image Gallery</span>
        </div>
    )
}
