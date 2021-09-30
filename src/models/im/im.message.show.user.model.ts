import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, Model, Table } from "sequelize-typescript";
import { IMMessage, User } from "..";

@Table({
  tableName: "imMessageShowUsers",
  comment: "Сообщения, которые пользователя просмотрели"
})
export default class IMMessageShowUser extends Model<IMMessageShowUser> {
  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => IMMessage)
  @Column({
    type: DataType.INTEGER
  })
  messageId: number;

  @BelongsTo(() => IMMessage)
  message: IMMessage;
}