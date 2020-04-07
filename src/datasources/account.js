const bcrypt = require('bcrypt');
const { DataSource } = require('apollo-datasource');

class AccountAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
    this.match = [];
  }
  initialize(config) {
    this.context = config.context;
  }
  getCurrentUser() {
    const user = this.context && this.context.user;
    return user;
  }
  async findUser({ ...props }) {
    const user = await this.store.findOne({
      where: props,
      attributes: { exclude: ['posts', 'followers'] },
    });
    return user;
  }
  async getPostsFromUser({ ...props }) {
    const user = await this.store.findOne({
      where: props,
      attributes: ['posts'],
    });
    return user;
  }
  async getFollowersFromUser({ ...props }) {
    const user = await this.store.findOne({
      where: props,
      attributes: ['followers'],
    });
    return user;
  }
  async createUser({ username, password, email }) {
    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds).then(async (hash) => {
      await this.store.create({
        username,
        password: hash,
        email,
        followers: [],
        imgurl: 'none',
        posts: [],
      });
    });
    const user = await this.findUser({ email });
    return user;
  }
  async signIn({ email, password }) {
    const user = await this.findUser({ email });
    if (user) {
      const res = bcrypt.compareSync(password, user.dataValues.password);
      return res && user;
    }
    return null;
  }
}

module.exports = AccountAPI;
