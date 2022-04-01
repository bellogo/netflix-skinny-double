/* eslint-disable valid-jsdoc */
const {
  responseCode, errorResponse, successResponse,
} = require("../utilities/helpers");

class MainController {
  constructor(mainRepo) {
    mainRepo;
  }

  /**
   *
   * create controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   create = async (req, res) => {
     try {
       const resource = await this.mainRepo.create(req.body);
       if (resource.dataValues.password) delete resource.dataValues.password;
       return successResponse(res, responseCode.CREATED, "resource has been added.", resource);
     } catch (err) {
       console.log(err);
       return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, "An error occurred.", err);
     }
   }

   /**
   *
   * create admin controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
    bulkCreate = async (req, res) => {
      try {
        const resources = await this.mainRepo.createMany(req.body);
        return successResponse(res, responseCode.CREATED, "resources have been added.", resources);
      } catch (err) {
        console.log(err);
        return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, "An error occurred.", err);
      }
    }

    /**
 *
 *  update resource
 * @static
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
  update = async (req, res) => {
    try {
      const id = req.body.id || req.params.id;
      const resource = await this.mainRepo.updateModel(id, req.body);
      return successResponse(res, responseCode.SUCCESS, "resource has been updated.", resource);
    } catch (err) {
      console.log(err);
      return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, "An error occurred.", err);
    }
  }

  /**
   *
   * get filtered resources by given conditions
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
 getAll = async (req, res) => {
   try {
     return successResponse(res, responseCode.SUCCESS, "resources has been delivered.", await this.mainRepo.getCollection());
   } catch (err) {
     console.log(err);
     return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, "An error occurred.", err);
   }
 }

   /**
     *
     * get one resource controller
     * @static
     * @param {*} req
     * @param {*} res
     * @return {*}
     */
   getOne = async (req, res) => {
     try {
       const { id } = req.params;
       const resource = await this.mainRepo.getModelById(id);
       if (!resource) return errorResponse(res, responseCode.BAD_REQUEST, "resource does not exist.");
       return successResponse(res, responseCode.SUCCESS, "resource has been delivered.", resource);
     } catch (err) {
       console.log(err);
       return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, "An error occurred.", err);
     }
   }

   /**
     *
     * delete resource controller
     * @static
     * @param {*} req
     * @param {*} res
     * @return {*}
     */
   delete = async (req, res) => {
     try {
       const { id } = req.params;

       const resource = await this.mainRepo.getModelById(id);
       if (!resource) return errorResponse(res, responseCode.BAD_REQUEST, "resource does not exist.");

       await this.mainRepo.deleteModel(id);
       return successResponse(res, responseCode.SUCCESS, "resource has been deleted.");
     } catch (err) {
       console.log(err);
       return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, "An error occurred.", err);
     }
   }
}
module.exports = MainController;
