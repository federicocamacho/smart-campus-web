import { Property } from './property';

/**
 * Represents the Gateway object.
 *
 * @export
 * @class Gateway
 */
export class Gateway {

    /**
     * The database object's id.
     *
     * @type {string}
     * @memberof Gateway
     */
    public id: string;

    /**
     * Gateway's name.
     *
     * @type {string}
     * @memberof Gateway
     */
    public name: string;

    /**
     * Gateway's description.
     *
     * @type {string}
     * @memberof Gateway
     */
    public description: string;

    /**
     * Gateway's endpoint 
     *
     * @type {string}
     * @memberof Gateway
     */
    public endpoint: string;

    public properties: Property[] = [];

    /**
     *Creates an instance of Gateway.
     * @param {string} [id='']
     * @param {string} [name='']
     * @param {string} [description='']
     * @param {string} [endpoint='']
     * @param {Property[]} [properties=[]]
     * @memberof Gateway
     */
    constructor(id: string = '', name: string = '', description: string = '', endpoint: string = '', properties: Property[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.endpoint = endpoint;
        this.properties = properties;
    }
}
