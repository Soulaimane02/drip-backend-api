import Address from "./address";
import DOB from "./dob";

interface SellerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: DOB;
  address: Address;
  ipAddress: string;
  iban: string;
  titularName: string;
}

export default SellerInfo;
