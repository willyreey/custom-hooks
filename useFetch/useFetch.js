import { useEffect, useState } from "react"

const localCache = {}

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoanding: true,
        hasError: false,
        errorMessage: null
    })

    useEffect(() => {
        getFetch()
    }, [url])

    const setLoanding = () =>{
        setState({
            data: null,
            isLoanding: true,
            hasError: false,
            errorMessage: null
        })
    }

    const getFetch = async() =>{

        if(localCache[url]){
            console.log('usando cache');
            setState({
                data: localCache[url],
                isLoanding: false,
                hasError: false,
                errorMessage: null
            })

            return
        }

        setLoanding()

        const resp = await fetch(url)

        await new Promise(resolve => setTimeout(resolve,300))

        if( !resp.ok ){

            setState({
                data: null,
                isLoanding: false,
                hasError: true,
                errorMessage: {
                    code: resp.status,
                    message: resp.statusText
                }
            })
            return
        }
        const data = await resp.json()
        setState({
            data: data,
            isLoanding: false,
            hasError: false,
            errorMessage: null
        })
        
        // Manejo del cache
        localCache[url] = data
    }
    
  return {
    data: state.data,
    isLoanding: state.isLoanding,
    hasError: state.hasError
  }
}
