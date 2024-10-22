import { CartItem, Coupon } from "../../../types";

// 아이템별 총 가격 계산
// export const calculateItemTotal = (item: CartItem) => {
//   const { price } = item.product;
//   const { quantity } = item;

//   console.log("아이템별 총 가격 ?", price * quantity);
//   return price * quantity;
// };

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

// 장바구니 총합 계산
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    // const itemTotal = calculateItemTotal(item);
    // totalBeforeDiscount += itemTotal;

    // // 각 상품에 적용 가능한 최대 할인율 적용
    // const maxDiscount = getMaxApplicableDiscount(item);
    // totalAfterDiscount += itemTotal * (1 - maxDiscount);

    // 아이템별 총 가격을 계산 (할인이 적용된 총 가격)
    const itemTotal = calculateItemTotal(item);
    totalBeforeDiscount += item.product.price * item.quantity; // 할인 전 총 가격

    totalAfterDiscount += itemTotal; // 할인 적용된 총 가격
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

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
