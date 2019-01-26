/**
 * Property object.
 *
 * @export
 * @class Property
 */
export class Property {
    
    /**
     * Property's name.
     *
     * @type {string}
     * @memberof Property
     */
    public name: string;

    /**
     * Property's description.
     *
     * @type {string}
     * @memberof Property
     */
    public description: string;

    /**
     * Property's type
     *
     * @type {('CONFIG' | 'REPORTED' | 'INFORMATIVE')}
     * @memberof Property
     */
    public type: 'CONFIG' | 'REPORTED' | 'INFORMATIVE';

    /**
     *Creates an instance of Property.
     * @param {string} [name='']
     * @param {string} [description='']
     * @param {('CONFIG' | 'REPORTED' | 'INFORMATIVE')} [type='INFORMATIVE']
     * @memberof Property
     */
    constructor(name: string = '', description: string = '', type: 'CONFIG' | 'REPORTED' | 'INFORMATIVE' = 'INFORMATIVE') {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}
