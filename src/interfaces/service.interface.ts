export interface IService {
  destroyConnection: () => Promise<void> | void;
}
