import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { BillState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';
import { of } from 'rxjs';
import * as objectPath from 'object-path';

export const billFeature = createFeatureSelector<AppState, BillState>(FEATURE_KEY);
export const selectBillDetail = createSelector(billFeature, (bill: BillState) => {
  const { detailBill: detail } = bill;
  if (detail !== null) {
    const items = detail.bill_item.map((item: any) => {
      const total = parseInt(item.quantity, 10) * parseFloat(item.price);
      return { ...item, total };
    });

    const titles = [
      'Bill.BillDetail.Num',
      'Bill.BillDetail.BusinessName',
      'Bill.BillDetail.Perception',
      'Bill.BillDetail.Iva',
      'Bill.BillDetail.BillType',
      'Bill.BillDetail.PaymentType',
      'Bill.BillDetail.BillDate',
      'Bill.BillDetail.Total',

    ];

    const keys = [
      'id',
      'client.business_name',
      'perception_value',
      'iva',
      'bill_type',
      'payment_type',
      'bill_date',
      'total'
    ];

    const details = keys.map((key, i) => {
      const value = objectPath.get(detail, key);
      return { title: titles[i], value };
    });

    return {
      details,
      items$: of(items),
    };
  }

  return detail;
});
