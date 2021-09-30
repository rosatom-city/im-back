import { Column, DataType, DeletedAt, HasMany, Model, Table } from "sequelize-typescript";
import { IMChannelUser, IMMessage, IMMessageShowUser } from "..";

@Table({
  tableName: "users",
  comment: "Список пользователей"
})
export default class User extends Model<User> {
  @DeletedAt
  deletedAt: Date;

  @Column({
    type: DataType.STRING
  })
  email: string;

  @Column({
    type: DataType.STRING
  })
  mobile: string;

  @Column({
    type: DataType.STRING,
    comment: "Хэш пароля"
  })
  pwd_hash: string;

  @Column({
    type: DataType.JSONB
  })
  extra: any;

  @HasMany(() => IMChannelUser)
  channels: IMChannelUser[];

  @HasMany(() => IMMessage)
  messages: IMMessage[];

  @HasMany(() => IMMessageShowUser)
  shownMessagess: IMMessageShowUser[];
}