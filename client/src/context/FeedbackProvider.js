import { FeedbackContext } from "./createContext"

export const FeedbackProvider = ({ children }) => {



    return (
        <FeedbackContext.Provider  value={{}}>
            {children}
        </FeedbackContext.Provider>
    )
}
