export class SignInDAO {
  id: number;
  email: string;
  password: string;
  name: string;
  create_at: Date;
  chage_at: Date;
  state: 'ACTIVE' | 'INACTIVE';
}
