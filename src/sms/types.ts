export type SMS = {
  message: string;
  phone: string;
  subject: string;
  msgType: "PROMOTIONAL" | "Transactional";
}
