/**
 * Basic fields for API Responses.
 *
 * @author Federico Camacho
 * @date 2018-07-14
 * @export
 * @class APIResponse
 */
export class APIResponse {
    /**
     *True if request was sucessful, false if it wasn't.
     *
     * @type {boolean}
     * @memberof APIResponse
     */
    response: boolean;

    /**
     *Optional field that is received if the request had an error.
     *
     * @type {APIError}
     * @memberof APIResponse
     */
    error?: APIError;
}

/**
 *Fields of error of API Response
 *
 * @author Federico Camacho
 * @date 2018-07-14
 * @export
 * @class APIError
 */
export class APIError {
    /**
     *API exception name associated with this error.
     *
     * @type {string}
     * @memberof APIError
     */
    type: string;

    /**
     *Specific error message for development.
     *
     * @type {string}
     * @memberof APIError
     */
    internalMessage: string;

    /**
     *Message to show to the user for this error.
     *
     * @type {string}
     * @memberof APIError
     */
    clientMessage: string;

    /**
     *HTTP Response code associated with the error.
     *
     * @type {number}
     * @memberof APIError
     */
    code: number;
}
