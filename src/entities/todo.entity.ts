import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity('todos')
export class Todo extends Model {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    default: false,
  })
  isDone: boolean;

  @Column({ name: 'userId', type: 'uuid', nullable: false })
  public userId: string;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({name: 'userId'})
  user: User;

  @Column({ name: 'categoryId', type: 'uuid', nullable: true })
  public categoryId: string;

  @ManyToOne(() => Category, (category) => category.todos)
  @JoinColumn({name: 'categoryId'})
  category: Category;
}