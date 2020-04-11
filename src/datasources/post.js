const { DataSource } = require('apollo-datasource');

class PostAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }
  async findPost({ id }) {
    const post = await this.store.findByPk(id);
    if (!post) {
      return {};
    }
    return post;
  }
  async createPost({ description, imgs, author }) {
    const post = await this.store.create({
      description,
      imgs,
      likes: [],
      author,
      comments: [],
    });
    return post;
  }
}

module.exports = PostAPI;
