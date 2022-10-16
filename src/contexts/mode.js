import {useState,createContext, useContext} from 'react'


// Context Creation for Setting the dark mode
const ModeContext = createContext();

const ModeContextProvider = ({children}) => {
    const [mode,setMode] = useState(false);

    return (
        <ModeContext.Provider value={{mode,setMode}}>
            {children}
        </ModeContext.Provider>
    )
}

 export const useModeContext = () => {
    return useContext(ModeContext)
}

export default ModeContextProvider;