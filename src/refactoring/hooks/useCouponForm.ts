import { useState } from "react";
import { Coupon } from "../../types.ts";

const useCouponForm = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const resetCoupon = () => {
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const updateCoupon = (key: keyof Coupon, value: any) => {
    setNewCoupon((prev) => ({ ...prev, [key]: value }));
  };

  return { newCoupon, resetCoupon, updateCoupon };
};

export default useCouponForm;
