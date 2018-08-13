import * as crypto from 'crypto';
import {Table, Column, Model, DataType, PrimaryKey, BeforeCreate, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @PrimaryKey
    @Column
    id: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    salt: string;

    @CreatedAt
    created: Date;
   
    @UpdatedAt
    updated: Date;

    getName(): string {
        return this.name;
    }

    setName(value: string): void {
        this.name = value;
    }

    getId(): string {
        return this.id;
    }

    getPassword(): string {
        return this.password;
    }

    /**
        * Authenticate - password 체크
        *
        * @param {String} password
        * @param {Function} callback
        * @return {Boolean}
        * @api public
   */
    authenticate(password: string): boolean {

        //if (!callback) {
            return this.getPassword() === this.encryptPassword(password).toString();
        //}

        //callback 처리
    }

    /**
   * Make salt - db에 저장
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */

    static makeSalt(byteSize: number): string {

        const defaultByteSize: number = 16;
        /*
        if ( typeof this.arguments[0] === 'function') {
            callback = this.arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof this.arguments[1] === 'function') {
            callback = this.arguments[1];
        }
        */
        if (byteSize < 1) {
            byteSize = defaultByteSize;
        }

        //if (!callback) {
            return crypto.randomBytes(byteSize).toString('hex');
        //}
        /*
        return crypto.randomBytes(byteSize, (err: Error, salt: Buffer): void => {
            if (err) {
                callback(err);
              } else {
                callback(null, salt.toString('base64'));
              }
        });
        */
    }

    /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */

   encryptPassword(password: string): string {
        
        const defaultIterations: number = 1000;
        const defaultKeyLength: number = 64;
        const saltedValue: Buffer = new Buffer(this.salt, 'base64');

        //if (!callback) {
            return crypto.pbkdf2Sync(password, saltedValue, defaultIterations, defaultKeyLength, 'sha512').toString('hex');
        //}

        //callback 처리
   }

   static validatePresenceOf(value: string): boolean {
        return ( 0 < value.length );
   }

   @BeforeCreate
   static setEncryptForUser(instance: User): void {
        
        if (false == User.validatePresenceOf(instance.password)) {
            return;
            // 에러처리필요 
        }
        const saltedValue: string = User.makeSalt(0);
        instance.salt = saltedValue;

        const hashedPassword: string = instance.encryptPassword(instance.password);
        instance.password = hashedPassword;
   }

}
