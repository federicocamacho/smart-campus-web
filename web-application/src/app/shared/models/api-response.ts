/**
 * Basic fields for API Responses.
 *
 * @date 2018-07-14
 * @export
 * @class APIResponse
 */
export class APIResponse {
    /**
     * Indicates wether the response exists or not.
     *
     * @type {boolean}
     * @memberof APIResponse
     */
    response: boolean;

    /**
     * Optional field that is received if the request had an error.
     *
     * @type {APIError}
     * @memberof APIResponse
     */
    error?: APIError;
}

/**
 *Fields of error of API Response
 *
 * @date 2018-07-14
 * @export
 * @class APIError
 */
export class APIError {
    /**
     * API exception name associated with this error.
     *
     * @type {string}
     * @memberof APIError
     */
    type: string;

    /**
     * Specific error message (for developers).
     *
     * @type {string}
     * @memberof APIError
     */
    internalMessage: string;

    /**
     * Error Message to show to the user.
     *
     * @type {string}
     * @memberof APIError
     */
    clientMessage: string;

    /**
     * HTTP Response code associated with the error.
     *
     * @type {number}
     * @memberof APIError
     */
    code: number;
}
