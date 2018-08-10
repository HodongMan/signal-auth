import * as crypto from 'crypto';
import {Table, Column, Model, HasMany, DataType, Unique, PrimaryKey, BeforeCount} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column(DataType.STRING)
    name: String;

    @Column(DataType.STRING)
    @Unique
    @PrimaryKey
    readonly id: String;

    @Column(DataType.STRING)
    email: String;

    @Column(DataType.STRING)
    password: String;

    @CreatedAt
    created: Date;
   
    @UpdatedAt
    updated: Date;

    @BeforeCreate

    /**
   * Make salt - db에 저장
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */

    static makeSalt(byteSize: number, callback: Function): void {

        const defaultByteSize: number = 16;

        if ( typeof this.arguments[0] === 'function') {
            callback = this.arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof this.arguments[1] === 'function') {
            callback = this.arguments[1];
        }

        if (byteSize < 1) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            //return crypto.randomBytes(byteSize).toString('base64');
            return;
        }

        return crypto.randomBytes(byteSize, (err: Error, salt: Buffer): void => {
            if (err) {
                callback(err);
              } else {
                callback(null, salt.toString('base64'));
              }
        });
    }
}