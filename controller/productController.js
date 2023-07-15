import productModel from "../models/productModel.js";

export const productController = async (req, res) => {
  try {
    const { img, place, distance, date, rate } = req.body;
    const newProduct = new productModel({
      img,
      place,
      distance,
      date,
      rate,
    });

    const exisitinguser = await productModel.findOne({ place });
    if (exisitinguser) {
      return res.status(200).send(
        {
          sucess: false,
          mesage: "already register  user plz login",
        },

        res.redirect("/cart")
      );
    } else {
      const { img, place, distance, date, rate } = req.body;
      const newProduct = new productModel({
        img,
        place,
        distance,
        date,
        rate,
      }).save();
      res.redirect("/cart");
    }
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "product no add sucessfully add",
      error,
    });
  }
};
