export default interface ChatEntity {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  status: number;
  created_at: Date;
}
