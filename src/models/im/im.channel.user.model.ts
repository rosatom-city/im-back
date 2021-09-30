import { BelongsTo, Column, DataType, Default, DeletedAt, ForeignKey, Model, Table } from "sequelize-typescript";
import { IMChannel, User } from "..";

@Table({
  tableName: "imChannelUsers",
  comment: "Участники каналов (как групповых, так и приватных)"
})
export default class IMChannelUser extends Model<IMChannelUser> {
  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => IMChannel)
  @Column({
    type: DataType.INTEGER
  })
  channelId: number;

  @BelongsTo(() => IMChannel)
  channel: IMChannel;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN
  })
  mute: boolean;
}