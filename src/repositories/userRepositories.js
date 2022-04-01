import { BaseRepository } from "./BaseRepository";
import UserModel from "../models/user";

class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.model = UserModel;
  }
}

export default UserRepository;
