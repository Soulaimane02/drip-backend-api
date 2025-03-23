import joi from "joi";
import Article from "../../models/entities/article/article";
import Condition from "../../models/enums/condition";
import Size from "../../models/enums/size";
import Color from "../../models/enums/color";

const ArticleRequestSchema = joi.object<Article>({
  name: joi.string().min(3).max(100).required(),
  description: joi.string().min(10).max(1000).required(),
  price: joi.number().min(0).required(),
  pictures: joi.array().items(joi.string().uri()).min(1).required(),
  likes: joi.number().min(0).default(0).optional(),
  views: joi.number().min(0).default(0).optional(),
  condition: joi.string().valid(...Object.values(Condition)).required(),
  categories: joi.array().items(joi.string().hex().length(24)).min(1).required(),
  size: joi.string().valid(...Object.values(Size)).optional(),
  color: joi.string().valid(...Object.values(Color)).optional()
});

export default ArticleRequestSchema;
