import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IMChannel, IMMessageShowUser, User } from "..";

export type tIMHistoryItem = { createdAt: number, text: string };
export type tIMAnswerMessage = { id: number, createdAt: number, text: string };
export type tIMMessageBody = {
  text: string,
  history?: tIMHistoryItem[],
  aMessage?: tIMAnswerMessage | any
};

@Table({
  tableName: "imMessages",
  comment: "Сообщения из чата"
})
export default class IMMessage extends Model<IMMessage> {
  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => IMChannel)
  @Column({
    type: DataType.INTEGER
  })
  channelId: number;

  @BelongsTo(() => IMChannel)
  channel: IMChannel;

  @Column({
    type: DataType.JSONB
  })
  body: tIMMessageBody;

  @HasMany(() => IMMessageShowUser)
  shownUsers: IMMessageShowUser[];
}