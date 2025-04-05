import Color from "../../../enums/color";
import Condition from "../../../enums/condition";
import Size from "../../../enums/size";

interface ArticleResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  pictures: string[];
  likes: number;
  views: number;
  condition: Condition;
  categories: string[];
  userId: string;
  size?: Size;
  color?: Color;
}

export default ArticleResponseDTO;
