import knexConnection from "../database/mysql_connect.js";
import * as yup from 'yup';

// creating app validation schema
const appValidationSchema = yup.object().shape({
  name: yup.string().required(),
  icon: yup.string().required(),
  url: yup.string().required(),
  user_id: yup.number().required()
});

// creating appLinks model
class appLinks {
  // Create AppLinks

  static async createApplinks(name, icon, url, userId) {
    try {
      const app_validate = { name, icon, url, user_id: userId };
      await appValidationSchema.validate(app_validate);

      const appLinkId = await knexConnection('app_links').insert(app_validate);
      
      return appLinkId;
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message
        }));
        throw { status: 400, message: 'Validation errors', errors: validationErrors };
      }
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
      
      if (!appLinks) {
        throw { status: 404, message: 'Apps not found' };
      }

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

      if (!appLinks) {
        throw { status: 404, message: 'Apps not found' };
      }

      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  static async updateAppLinks(id, name, icon, url, userId) {
    try {
      const app_validate = { name, icon, url, user_id: userId };
      await appValidationSchema.validate(app_validate);

      const apps = await knexConnection('app_links').where({ id }).update(app_validate);
      
      return apps;
      
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message
        }));
        throw { status: 400, message: 'Validation errors', errors: validationErrors };
      }
      throw error;
    }
  }

  // Delete AppLinks
  static async deleteAppLinks(id) {
    try {
      const appLinks = await knexConnection('app_links').where({ id }).del();

      if (!appLinks) {
        throw { status: 404, message: 'App not found' };
      }
      
      return appLinks;

    } catch (error) {
      throw error;
    }
  }

  // Delete All AppLinks
  static async deleteAllAppLinks() {
    try {
      const appLinks = await knexConnection('app_links').del();

      if (!appLinks) {
        throw { status: 404, message: 'Apps not found' };
      }

      return appLinks;
      
    } catch (error) {
      throw error;
    }
  }
}

export default appLinks;