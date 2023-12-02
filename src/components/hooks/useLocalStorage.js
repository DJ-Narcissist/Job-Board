import React, { useEffect, useState } from "react";


const useLocalStorage = (key, firstValue = null) => {
    const intialValue = localStorage.getItem(key) || firstValue;
    const [item, setItem] = useState(intialValue);

    useEffect(function setKeyInLocalStorage() {
        console.debug("hooks useLocalStorage useEffect", "item=", item);

        if (item === null) {
            localStorage.removeItem(key);
        }   else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);
    return [item,setItem];
}

export default useLocalStorage;