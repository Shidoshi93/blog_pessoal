import { IsNotEmpty } from 'class-validator';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn,
    ManyToOne,
    CreateDateColumn
} from 'typeorm';
import { Theme } from '../../theme/entities/theme.entity';
import { User } from '../../usuario/entities/user.entity';

@Entity({ name: 'tb_posts' })
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  title: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  text: string;

  @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Theme, (theme) => theme.posts, { 
    onDelete: 'CASCADE'
  })
  theme: Theme;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE'
  })
  user: User;
}