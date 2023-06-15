import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name?: string;

  @Column()
  public hashedPassword: string;
  @Column()
  public salt?: string;

  @Column({ default: 'user' })
  public roles: string;

  @Column({ default: 'secret' })
  public secret: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}

export default User;
