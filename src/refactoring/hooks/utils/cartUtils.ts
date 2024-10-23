import { CartItem, Coupon } from "../../../types";

// 아이템별 총 가격 계산
export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;

  // 할인률 계산
  const maxDiscount = getMaxApplicableDiscount(item);

  // 할인 적용
  const total = price * quantity * (1 - maxDiscount);

  return total;
};

// 적용 가능한 최대 할인 계산
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  let maxDiscount = 0;
  discounts.forEach((discount) => {
    if (quantity >= discount.quantity) {
      maxDiscount = Math.max(maxDiscount, discount.rate);
    }
  });

  return maxDiscount;
};

// 할인 전 가격
export const getTotalBeforeDiscount = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => {
    const { price } = item.product;
    const { quantity } = item;
    const itemTotal = price * quantity;
    return acc + itemTotal;
  }, 0);
};

// 할인 후 가격
export const getTotalAfterDiscount = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => {
    const itemTotal = calculateItemTotal(item);
    return acc + itemTotal;
  }, 0);
};

// 쿠폰 적용
export const applyCouponDiscount = (totalAfterDiscount: number, selectedCoupon: Coupon | null): number => {
  if (!selectedCoupon) return totalAfterDiscount;

  if (selectedCoupon.discountType === "amount") {
    return Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
  } else {
    return totalAfterDiscount * (1 - selectedCoupon.discountValue / 100);
  }
};

// 장바구니 총합 계산
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = getTotalBeforeDiscount(cart);
  let totalAfterDiscount = getTotalAfterDiscount(cart);

  totalAfterDiscount = applyCouponDiscount(totalAfterDiscount, selectedCoupon);

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

// 장바구니 아이템 수량 업데이트
export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
