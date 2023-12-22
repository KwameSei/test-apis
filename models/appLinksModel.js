import knexConnection from "../database/mysql_connect";

// creating appLinks model
class appLinks {
  // Create AppLinks
  static async createApplinks(userId, name, link, url) {
    try {
      const appLinkId = await knexConnection('app_links').insert({
        user_id: userId,
        name,
        link,
        url
      });
      return appLinkId;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get AppLinks by userId
  static async getAppLinksByUserId(userId) {
    try {
      const appLinks = await knexConnection('app_links').where({ user_id: userId });
      return appLinks;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get AppLinks by id
  static async getAppLinksById(id) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).first();
      return appLinks;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get all AppLinks
  static async getAllAppLinks() {
    try {
      const appLinks = await knexConnection('app_links');
      return appLinks;
    } catch (error) {
      throw new error(error);
    }
  }

  // Update AppLinks
  static async updateAppLinks(id, userId, name, link, url) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).update({
        user_id: userId,
        name,
        link,
        url
      });
      return appLinks;
    } catch (error) {
      throw new error(error);
    }
  }

  // Delete AppLinks
  static async deleteAppLinks(id) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).del();
      return appLinks;
    } catch (error) {
      throw new error(error);
    }
  }

  // Delete All AppLinks
  static async deleteAllAppLinks() {
    try {
      const appLinks = await knexConnection('app_links').del();
      return appLinks;
    } catch (error) {
      throw new error(error);
    }
  }
}

export default appLinks;