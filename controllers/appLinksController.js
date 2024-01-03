import appLinks from "../models/appLinksModel.js";

// Create AppLinks Controller
class AppLinksController {
  // Create appLinks
  static async createApp(req, res) {
    try {
      console.log('Request body', req.body);

      const { name, url, icon } = req.body;
      const userId = req.user.id;

      console.log('name:', name);
      console.log('url:', url);
      console.log('icon:', icon);
      console.log('userId:', userId);
    
      // Validate user input
      if (!name || !url || !icon) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'App Links name, icon and url required'
        })
      }

      // Check for invalid inputs
      if (typeof name !== 'string' || typeof url !== 'string' || typeof icon !== 'string') {
        return res.status(409).json({
          success: false,
          status: 409,
          message: "App Links name, icon and icon required, invalid inputs are not allowed"
        })
      }

      // check if app link already exists
      const appLink = await appLinks.getAppLinksByName(name);
      if (appLink) {
        return res.status(409).json({
          success: false,
          status: 409,
          message: 'App already exists'
        })
      }

      const apps = await appLinks.createApplinks(name, icon, url, userId);
      
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'App Link created successfully',
        data: {
          id: apps,
          name,
          icon,
          url,
          user_id: userId
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Internal server error'
      })
    }
  }

  // Get all appLinks
  static async getAllAppLinks(req, res) {
    try {

      const apps = await appLinks.getAllAppLinks();

      if (apps.length < 1) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Apps not found'
        });
      }

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Apps retrieved successfully',
        data: apps
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Internal server error'
      });
    }
  }

  // Get apps by id
  static async getAppLinksById(req, res) {
    try {

      const { id } = req.params;
      const apps = await appLinks.getAppLinksById(id);

      if (!apps) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'App not found',
          error: 'App not found'
        });
      }

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'App retrieved successfully',
        data: apps
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Internal server error'
      });
    }
  }

  // Update appLinks
  static async updateAppLinks(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { name, icon, url } = req.body;

      const apps = await appLinks.getAppLinksById(id);
      if (!apps) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Apps not found',
          error: 'Apps not found'
        });
      }

      // Validate user input
      if (!name || !url || !icon) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'App Links name, icon and url required',
          error: 'App Links name, icon and url required'
        })
      }

      // check if app link id is valid
      if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "App id is not valid",
          error: "App id is not valid"
        });
      }

      // Check for invalid inputs
      if (typeof name !== 'string' || typeof url !== 'string' || typeof icon !== 'string') {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "App name, icon and url required, invalid inputs are not allowed",
          error: "App name, icon and url required, invalid inputs are not allowed"
        })
      }

      // check if app link already exists
      const appExists = await appLinks.getAppLinksByName(name);
      if (appExists && appExists.id !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          status: 409,
          message: 'App already exists',
          error: 'App already exists'
        });
      }

      // check if user is the owner of the app
      if (apps.user_id !== userId) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: 'You are not allowed to update this app',
          error: 'You are not allowed to update this app'
        })
      }

      const updatedAppLinks = await appLinks.updateAppLinks(id, name, icon, url, userId);
      
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'App updated successfully',
        data: {
          id: id,
          name,
          icon,
          url,
          user_id: userId
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Apps not found',
        error: 'Apps not found'
      });
    }
  }

  // Delete appLinks
  static async deleteApp(req, res) {
    try {
      const { id } = req.params;

      const apps = await appLinks.getAppLinksById(id);
      if (!apps) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'AppLinks not found'
        });
      }

      // check if app link id is valid
      if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "App id is not valid"
        });
      }

      // check if user is the owner of the app
      if (apps.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: 'You are not allowed to delete this app'
        })
      }

      await appLinks.deleteAppLinks(id);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'App deleted successfully',
        data: {
          id: id,
          name: apps.name,
          icon: apps.icon,
          url: apps.url,
          user_id: apps.user_id
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Internal server error'
      });
    }
  }
}

export default AppLinksController;