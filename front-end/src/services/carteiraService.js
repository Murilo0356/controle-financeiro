import BaseService from "./BaseService";

class CarteiraService extends BaseService {
  constructor() {
    super('/carteiras');
  }
}

export default new CarteiraService();