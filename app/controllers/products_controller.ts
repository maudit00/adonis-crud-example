
import { HttpContext } from "@adonisjs/core/http";
import Product from "../models/product.js";

export default class ProductsController {
  async store({ request, response }: HttpContext) {
    const data = await request.only(['name'])
      try {
      // Create a new entry in the database
      const item = await Product.create(data)

      // Return a successful response
      return response.status(201).json({
        message: 'Item created successfully',
        data: item
      })
    } catch (error) {
      // If an error occurs, return an error response
      return response.status(500).json({
        message: 'Failed to create item',
        error: error.message
      })
    }
  }
  async destroy({params, response}:HttpContext){
    try {
          const product = await Product.findOrFail(params.id)
    await product.delete();
    return response.status(200).json({
      message: 'Item deleted successfully',
      data: product
    })
  } catch (err) {
    return response.status(500).json({
      message: 'Failed to delete item',
      error: err.message
    })
  }
}

 async update({params, request, response}:HttpContext){
try {
  const product = await Product.findOrFail(params.id)
  const data = await request.only(['name'])
  await product.merge(data)
  await product.save()
  return response.status(200).json({
    message: 'Item updated successfully',
    data: product
  })
} catch(err) {
  return response.status(500).json({
    message: 'Failed to update item',
    error: err.message
  })
}
 }
}
