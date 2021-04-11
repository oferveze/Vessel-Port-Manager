export const getAllVessels = () => {
    return fetch('/vessels')
    .then(res => res.json());
};

export const postVessel = (vesselName) => {
    const body = {
        vesselName
    }

    return doRequest("", "POST", body);
}

export const deleteVessel = (id) => {
    return doRequest(`/${id}`, "DELETE")
}

export const putVessel = (id, vessel) => {
    const body = {
        vessel
    };

    return doRequest(`/${id}`, "PUT", body)
}

const doRequest = (path, method, body) => {
        
    if (body) {
        body = JSON.stringify(body);
    }

    const options = {
        method,
        headers: body ? {
            'Content-Type': 'application/json'
        } : undefined,
        body,
    }

    return fetch(`/vessels${path}`, options)
    .then(resp => {
        if (resp.status >= 400 &&  resp.status < 600) {
            throw new Error(resp.text);
        }

        return resp;
    });
}
