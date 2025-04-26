import joi from "joi";
import Favorite from "../../models/entities/favorite/favorite";

const FavoriteRequestSchema = joi.object<Favorite>({
  userId: joi.string().hex().length(24).required(),
  articleId: joi.string().hex().length(24).required()
});

export default FavoriteRequestSchema;
