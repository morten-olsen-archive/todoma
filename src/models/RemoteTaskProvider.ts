import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
class RemoteTaskProvider {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public type!: string;

  @Column()
  public config!: string;
}

export default RemoteTaskProvider;
