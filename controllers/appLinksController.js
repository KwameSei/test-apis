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
          message: 'App Links name, icon and icon required'
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
          message: 'App not found'
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
          message: 'AppLinks not found'
        });
      }

      const updatedAppLinks = await appLinks.updateAppLinks(id, name, url, icon, userId);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'App updated successfully',
        data: [{
          id: updatedAppLinks,
          name,
          icon,
          url,
          user_id: userId
        }]
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

      await appLinks.deleteAppLinks(id);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'AppLinks deleted successfully'
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