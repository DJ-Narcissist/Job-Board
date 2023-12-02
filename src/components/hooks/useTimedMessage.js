import { useRef, useEffect } from "react";

/** Custom hook fpr managing "flash" messages */

const  usedTimeMessage = (timeInMsec =2000) => {
    const [active, setActive] = useRef(false);

    useEffect(
        function showSavedMessage() {
            console.debug(
                "useTimedMessage useEffect shoeSavedMessage", "active= ", active);
            
            if (active && !messageShownRef.current) {
                messageShownRef.current = true;
                setTimeout(function removeMessages(){
                    setActive(false);
                    messageShownRef.current = false;
                }, timeInMsec)
            }
        },
        [active,timeInMsec]
    );
    return [active,setActive]
}


export default usedTimeMessage;