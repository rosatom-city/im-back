import { Column, DataType, Default, DeletedAt, HasMany, Model, Table } from "sequelize-typescript";
import { IMChannelUser, IMMessage } from "..";

@Table({
  tableName: "imChannels",
  comment: "Список каналов чата"
})
export default class IMChannel extends Model<IMChannel> {
  @DeletedAt
  deletedAt: Date;

  @Column({
    type: DataType.STRING,
    comment: "Название групповых каналов"
  })
  title: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    comment: "Признак, что канал приватный"
  })
  private: boolean;

  @HasMany(() => IMChannelUser)
  users: IMChannelUser[];

  @HasMany(() => IMMessage)
  messages: IMMessage[];
}