export default interface IMessageModel {
  id: string;
  userId: string;
  chatId: string;
  message: string;
  dateTimeCreated: Date;
  dateTimeModified: Date;
  states: [
    {
      status: string;
      timestamp: Date;
    }
  ];
}
