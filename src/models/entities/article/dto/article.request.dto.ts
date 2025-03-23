import Color from "../../../enums/color";
import Condition from "../../../enums/condition";
import Size from "../../../enums/size";
import Category from "../../category/category";

interface ArticleRequestDTO {
  name: string;
  description: string;
  price: number;
  pictures: string[];
  condition: Condition;
  categories: Category[];
  size?: Size;
  color?: Color;
}

export default ArticleRequestDTO;
