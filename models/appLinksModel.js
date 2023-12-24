import knexConnection from "../database/mysql_connect.js";

// creating appLinks model
class appLinks {
  // Create AppLinks
  static async createApplinks(name, icon, url, userId) {
    try {
      const appLinkId = await knexConnection('app_links').insert({
        name,
        icon,
        user_id: userId,
        url,
      });

      return appLinkId;

    } catch (error) {
      throw error;
    }
  }

  // Get AppLinks by userId
  static async getAppLinksByUserId(userId) {
    try {
      const appLinks = await knexConnection('app_links').where({ user_id: userId });
      
      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Get AppLinks by id
  static async getAppLinksById(id) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).first();
      
      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Get AppLinks by name
  static async getAppLinksByName(name) {
    try {
      const appLinks = await knexConnection('app_links').where({ name }).first();
      
      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Get all AppLinks
  static async getAllAppLinks() {
    try {
      const appLinks = await knexConnection('app_links');

      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Update AppLinks
  static async updateAppLinks(id, name, icon, url, userId) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).update({
        name,
        icon,
        user_id: userId,
        url
      });

      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Delete AppLinks
  static async deleteAppLinks(id) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).del();
      
      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Delete All AppLinks
  static async deleteAllAppLinks() {
    try {
      const appLinks = await knexConnection('app_links').del();
      return appLinks;
    } catch (error) {
      throw error;
    }
  }
}

export default appLinks;