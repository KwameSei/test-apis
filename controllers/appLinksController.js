import appLinks from "../models/appLinksModel";

// Create AppLinks Controller
class AppLinksController {
  // Create appLinks
  static async createAppLinks(req, res) {
    try {
      console.error('Request body', req.body);

      const { name, url, icon, userId } = req.body;
    
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

      const appLinks = await appLinks.createAppLinks(name, url, icon, userId);
      
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'App Link created successfully',
        data: [{
          id: appLinks,
          name,
          url,
          icon,
          user_id: userId
        }]
      });
    } catch (error) {
      console.error(error);
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

      const appLinks = await appLinks.getAllAppLinks();

      if (appLinks.length < 1) {
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
        data: appLinks
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
      const appLinks = await appLinks.getAppLinksById(id);

      if (!appLinks) {
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
        data: appLinks
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
      const { name, icon, url, userId } = req.body;

      const appLinks = await appLinks.getAppLinksById(id);
      if (!appLinks) {
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
          url,
          icon,
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
  static async deleteAppLinks(req, res) {
    try {
      const { id } = req.params;

      const appLinks = await appLinks.getAppLinksById(id);
      if (!appLinks) {
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