import { Coupon } from "../../types.ts";
import useCouponForm from "../hooks/useCouponForm.ts";

interface CouponFormProps {
  onAdd: (coupon: Coupon) => void;
}

const CouponForm = ({ onAdd }: CouponFormProps) => {
  const { newCoupon, resetCoupon, updateCoupon } = useCouponForm();

  const handleAdd = () => {
    onAdd(newCoupon);
    resetCoupon();
  };

  return (
    <div className="space-y-2 mb-4">
      <input type="text" placeholder="쿠폰 이름" value={newCoupon.name} onChange={(e) => updateCoupon("name", e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="쿠폰 코드" value={newCoupon.code} onChange={(e) => updateCoupon("code", e.target.value)} className="w-full p-2 border rounded" />
      <div className="flex gap-2">
        <select value={newCoupon.discountType} onChange={(e) => updateCoupon("discountType", e.target.value)} className="w-full p-2 border rounded">
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input type="number" placeholder="할인 값" value={newCoupon.discountValue} onChange={(e) => updateCoupon("discountValue", parseInt(e.target.value))} className="w-full p-2 border rounded" />
      </div>
      <button onClick={handleAdd} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </button>
    </div>
  );
};

export default CouponForm;
