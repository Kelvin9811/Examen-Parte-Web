import Axios, { AxiosRequestConfig } from "axios";


export async function login(email, password) {

    //return currentUser;
}


function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}


export const callApiAxios = async (url, method, data, typeData) => {

    let baseURL = 'http://localhost:3001/'
    let urlComplete = baseURL + url;
    let configAxios = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer`,
            'x-end-user-terminal': '186.28.75.10',
            'x-end-user-login': 'user',
            'x-request-id': '4f9aa743-0cad-46f0-b055-c42e0ab6e216',
            'x-end-user-request-date-time': '2019-10-11T23:00:27Z',
            'Access-Control-Allow-Origin': '*'
        },
        method: method,
        timeout: 10000,
    }
    if (typeData === 'Params') {
        configAxios.params = data
    } else if (typeData === 'Body') {
        configAxios.data = data
    } else {
        configAxios.params = data.params
        configAxios.data = data.body
    }

    console.log(configAxios);

    const respuesta = await Axios(urlComplete, configAxios).then((res) => {
        //console.log(res)
        return { data: res.data }
    }).catch(function (error) {
        console.log('catch ->>', error)
    });
    return respuesta;
}

