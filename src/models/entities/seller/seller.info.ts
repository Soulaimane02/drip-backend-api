import Adress from "./adress";
import DOB from "./dob";

interface SellerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: DOB;
  address: Adress;
}

export default SellerInfo;
