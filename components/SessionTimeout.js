import React, {useState, useEffect, useRef, useCallback, Fragment} from 'react';
import moment from 'moment';

const SessionTimeout = () => {

    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [second, setSecond] = useState(0);

    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

    //start inactive check
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 60000);
    };

    //warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 2; // maximum ideal time before logout
            const popTime = 1; // remaining time left before logout, notification

            const diff = moment.duration(moment().diff(moment(timeString)));
            const minPast = diff.minutes();
            const leftSecond = 60 - diff.seconds();

            if (minPast === popTime){
                setSecond(leftSecond);
            }

            if (minPast === maxTime){
                clearInterval(warningInactiveInterval.current);
                sessionStorage.removeItem('lastTimeStamp');

                ///////////////////////////////////////////////
                ///           LOGOUT FUNCTION HERE          ///  
                /////////////////////////////////////////////// 
                
            }
        }, 1000);
    };

    //reset interval Timer
    let resetTimer = useCallback(() => {

        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);

        if (isAuthenticated){
            timeStamp = moment();
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
        }

        timeChecker();
    }, [isAuthenticated]);

    // life cycle hook
    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        //run timeChecker
        timeChecker();

        return () => {
            clearTimeout(startTimerInterval.current);
            //   resetTimer();
          };
        }, [resetTimer, events, timeChecker]);

    return <Fragment/>;
};

export default SessionTimeout;