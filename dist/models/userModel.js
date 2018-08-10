"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1;
const crypto = require("crypto");
const sequelize_typescript_1 = require("sequelize-typescript");
let User = User_1 = class User extends sequelize_typescript_1.Model {
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getId() {
        return this.id;
    }
    getPassword() {
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
    authenticate(password) {
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
    static makeSalt(byteSize) {
        const defaultByteSize = 16;
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
    encryptPassword(password) {
        const defaultIterations = 1000;
        const defaultKeyLength = 64;
        const saltedValue = new Buffer(this.salt, 'base64');
        //if (!callback) {
        return crypto.pbkdf2Sync(password, saltedValue, defaultIterations, defaultKeyLength, 'sha512').toString('hex');
        //}
        //callback 처리
    }
    static validatePresenceOf(value) {
        return (0 < value.length);
    }
    static setEncryptForUser(instance) {
        if (false == User_1.validatePresenceOf(instance.password)) {
            return;
            // 에러처리필요 
        }
        const saltedValue = User_1.makeSalt(0);
        instance.salt = saltedValue;
        const hashedPassword = instance.encryptPassword(instance.password);
        instance.password = hashedPassword;
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], User.prototype, "created", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], User.prototype, "updated", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "setEncryptForUser", null);
User = User_1 = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
//# sourceMappingURL=UserModel.js.map