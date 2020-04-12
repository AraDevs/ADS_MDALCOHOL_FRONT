import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { BillState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';
import { of } from 'rxjs';

export const billFeature = createFeatureSelector<AppState, BillState>(FEATURE_KEY);
export const selectBillDetail = createSelector(billFeature, (bill: BillState) => {
  const { detailBill: detail } = bill;
  if (detail !== null) {
    const items = detail.bill_item.map((item: any) => {
      const total = parseInt(item.quantity, 10) * parseFloat(item.price);
      return { ...item, total };
    });
    return {
      id: detail.id,
      client: detail.client.business_name,
      perception: detail.perception_value,
      iva: detail.value,
      total: detail.total,
      date: detail.bill_date,
      paymentType: detail.payment_type,
      billType: detail.bill_type,
      items$: of(items),
    };
  }

  return detail;
});
