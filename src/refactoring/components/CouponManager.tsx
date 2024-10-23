import { Coupon } from "../../types.ts";
import CouponList from "./CouponList.tsx";
import CouponForm from "./CouponForm.tsx";

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

const CouponManager = ({ coupons, onCouponAdd }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm onAdd={onCouponAdd} />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};

export default CouponManager;
