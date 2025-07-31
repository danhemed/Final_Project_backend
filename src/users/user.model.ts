// src/users/user.model.ts
import { DataTypes, Model } from 'sequelize';

export class User extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;

    static initialize(sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                role: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                timestamps: false,
            }
        );
    }
}
