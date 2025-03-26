import Color from "../../../enums/color";
import Condition from "../../../enums/condition";
import Size from "../../../enums/size";

interface ArticleRequestDTO {
  name: string;
  description: string;
  price: number;
  pictures: string[];
  condition: Condition;
  categories: string[];
  size?: Size;
  color?: Color;
}

export default ArticleRequestDTO;
