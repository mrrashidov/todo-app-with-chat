export class ResetPassword {
  id: number;
  user_id: number;
  token: string;
  password: string;
  status: number;
  created_at: Date;
  expires_at: Date;
}
