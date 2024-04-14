import React from 'react';
import SiteNavigation from "./components/routes/Routes";
import {useUser} from "./stores/UserStore";
import {ThreeCircles} from "react-loader-spinner";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const {
        checkUser
    } = useUser()

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setTimeout(() => {
                checkUser().finally(() => {
                    setIsLoading(false)
                })
            }, 2000)
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [checkUser])

    if (isLoading) {
        return <div className="app__circle">
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#006e6e"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return (
        <SiteNavigation/>
    );
};

export default App;
