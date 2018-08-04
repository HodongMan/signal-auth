import {Table, Column, Model, HasMany, DataType, Unique, PrimaryKey} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column(DataType.STRING)
    name: String;

    @Column(DataType.STRING)
    @Unique
    @PrimaryKey
    id: String;

    @Column(DataType.STRING)
    email: String;

    @Column(DataType.STRING)
    password: String;

    @CreatedAt
    created: Date;
   
    @UpdatedAt
    updated: Date;
}